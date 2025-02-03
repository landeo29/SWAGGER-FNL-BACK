import database from '../config/database';
import * as tf from '@tensorflow/tfjs-node';
import * as path from 'path';

let model: tf.LayersModel | null = null;

export const cargarModelo = async (): Promise<void> => {
    try {
        console.log("Cargando modelo...");
        const modelPath = `file://${path.resolve(__dirname, '../../modelo_estres_tfjs/model.json')}`;
        model = await tf.loadLayersModel(modelPath);
        console.log('Modelo cargado correctamente.');
    } catch (error) {
        console.error('Error al cargar el modelo:', error);
    }
};

export const obtenerUltimos14Dias = async (): Promise<{ fecha: string, promedio_caritas: number }[] | null> => {
    try {
        const connection = database.getConnection();
        if (!connection) {
            console.error('No se pudo obtener la conexión con la base de datos.');
            return null;
        }

        const [rows]: any = await connection.query(
            `SELECT DATE(created_at) as fecha, ROUND(AVG(caritas), 2) as promedio_caritas
             FROM user_estres_sessions
             WHERE caritas IS NOT NULL
             GROUP BY fecha
             ORDER BY fecha ASC
             LIMIT 14;`
        );

        if (rows.length < 14) {
            console.warn('No hay suficientes datos históricos para hacer predicciones.');
            return null;
        }

        return rows.map((row: any) => ({
            fecha: row.fecha,
            promedio_caritas: parseFloat(row.promedio_caritas)
        }));
    } catch (error) {
        console.error('Error al obtener datos de MySQL:', error);
        return null;
    }
};

const calcularMAE = (valoresReales: number[], valoresPredichos: number[]): number => {
    const errores = valoresReales.map((real, i) => Math.abs(real - valoresPredichos[i]));
    return errores.reduce((a, b) => a + b, 0) / errores.length;
};

export const predecirEstres = async (): Promise<{
    historico: number[],
    prediccion: { fecha: string, caritas_predicho: number }[],
    precision?: string,
    mensaje?: string
} | null> => {

    if (!model) {
        console.error('El modelo no ha sido cargado. Intentando cargarlo nuevamente...');
        await cargarModelo();
        if (!model) {
            console.error('No se pudo cargar el modelo.');
            return null;
        }
    }

    const historial = await obtenerUltimos14Dias();
    if (!historial) return null;

    const caritas_values = historial.map(row => row.promedio_caritas);

    if (caritas_values.length < 7) {
        return {
            historico: caritas_values,
            prediccion: [],
            mensaje: 'No hay suficientes datos para hacer una predicción. Se necesitan al menos 7 días de datos.'
        };
    }

    const input_sequence = caritas_values.slice(-7);

    const caritas_normalizadas = input_sequence.map(valor => (valor - 1) / (3 - 1));

    const X_input = tf.tensor3d([caritas_normalizadas.map(x => [x])], [1, 7, 1]);

    const prediccionTensor = model.predict(X_input) as tf.Tensor;

    const valoresPredichosNormalizados = Array.from(prediccionTensor.dataSync());
    console.log("📌 Predicción normalizada:", valoresPredichosNormalizados);

    const valoresPredichosEscalados = valoresPredichosNormalizados.map(
        valor => parseFloat(((valor * (3 - 1)) + 1).toFixed(2))
    );

    const fechaUltimaBD = new Date(historial[historial.length - 1].fecha);
    let nuevasPredicciones = valoresPredichosEscalados.map((valor, i) => {
        let fecha = new Date(fechaUltimaBD);
        fecha.setDate(fechaUltimaBD.getDate() + i + 1);
        return { fecha: fecha.toISOString().split('T')[0], caritas_predicho: valor };
    });

    const ultimos7Reales = caritas_values.slice(-7);
    const ultimos7Predichos = valoresPredichosEscalados.slice(0, ultimos7Reales.length);
    let mae = calcularMAE(ultimos7Reales, ultimos7Predichos);
    let precision = Math.max(0, 100 - ((mae / (3 - 1)) * 100));

    console.log("\n**Valores Reales vs. Predichos**");
    ultimos7Reales.forEach((real, i) => {
        console.log(`🔹 Día ${i + 1}: Real = ${real} | Predicho = ${ultimos7Predichos[i]}`);
    });

    console.log(`**MAE Calculado:** ${mae}`);
    console.log(`**Precisión Final:** ${precision}%`);



    return {
        historico: ultimos7Reales,
        prediccion: nuevasPredicciones,
        precision: `${precision.toFixed(2)}%`
    };
};
