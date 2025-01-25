//import { Sequelize } from "sequelize-typescript";
//import {  Sequelize } from "sequelize";
//import { UserEstresSession } from "../../models/Clasificacion/userestressession";
import { User } from "../../models/User/user";
//import database from "../../config/database";
import { Message } from "../../models/ChatBot/message";
import { Op } from "sequelize";
import { endOfDay, startOfDay } from "date-fns";
import { EstresNiveles } from "../../models/Clasificacion/estres_niveles";
import { Empresas } from "../../models/Global/empresas";
//import moment from "moment";

class MetricasController {
  async TotalEmpleados(req: any, res: any) {
    try {

      const empresa_id = req.params.empresa_id;
      const cant = await User.count({
        where: {
          empresa_id,
        },
      });
      if (!cant)
        return res.status(404).json({ message: "no se encontraron usuarios" });
      return res.status(200).json({ cant });
    } catch (error: any) {
      console.log("Error: ", error.message);
    }
  }
  async EmpleadosEstressPorcentaje(req: any, res: any) {
    try {
      const empresa_id = req.params.empresa_id;
  
      // Verificar si la empresa existe
      const empresa = await Empresas.findOne({ where: { id: empresa_id } });
      if (!empresa) {
        return res.status(404).json({ error: "Empresa no encontrada" });
      }
  
      // Obtener el total de empleados de la empresa
      const totalUsuarios = await User.count({
        where: { empresa_id: empresa_id },
      });
  
      if (totalUsuarios === 0) {
        return res.status(200).json({
          empresa: empresa.nombre,
          nivel_estres: "Alto",
          cantidad_nivel_alto: 0,
          total_usuarios_empresa: 0,
          porcentaje: 0,
          mensaje: "No hay empleados registrados en esta empresa",
        });
      }
  
      // Obtener la cantidad de empleados con nivel de estrés "Alto"
      const estresNivelAlto = await EstresNiveles.findOne({
        where: { nombre: "Alto" },
      });
  
      if (!estresNivelAlto) {
        return res.status(404).json({ error: "Nivel de estrés 'Alto' no encontrado" });
      }
  
      const cantidadAlto = estresNivelAlto.cantidad || 0;
  
      // Calcular el porcentaje
      const porcentajeAlto = (cantidadAlto / totalUsuarios) * 100;
  
      // Responder con los datos
      return res.status(200).json({
        empresa: empresa.nombre,
        nivel_estres: "Alto",
        cantidad_nivel_alto: cantidadAlto,
        total_usuarios_empresa: totalUsuarios,
        porcentaje: porcentajeAlto.toFixed(2), // Limitar a 2 decimales
      });
    } catch (error: any) {
      console.error("Error: ", error.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  
  async EmpleadosUsaronFuncy(_req: any, res: any) {
    //const hoy = new Date();
    const startOfDayLocal = startOfDay(new Date());
    const endOfDayLocal = endOfDay(new Date());
    console.log("hoy: ", startOfDayLocal, endOfDayLocal);
    const cantidadMensajes = await Message.count({
      where: {
        user_id: {
          [Op.ne]: 1,
        },
        created_at: {
            [Op.between]: [startOfDayLocal, endOfDayLocal], // Filtra los mensajes creados entre el inicio y el fin del día
          },
      },
    });
    return res.status(200).json({ cant: cantidadMensajes });
  }
  async CausaEstres(req:any,res:any){
    const userId = req.params.userId;
    const mensajes = await Message.findAll({
      where: {
        user_id: userId
      },
      attributes: ["factor_psicosocial"]
    })
    const repetidos: Record<string, number> = {};
    mensajes.forEach((mensaje) => {
        const factor = mensaje.factor_psicosocial;
        repetidos[factor] = (repetidos[factor] || 0) + 1;
    });

    // Convierte el objeto de conteo en un array de objetos
    const causas = Object.keys(repetidos).map((factor) => ({
        causa: factor,
        count: repetidos[factor],
    }));
    return res.status(200).json(causas);
  }
  
  async TotalEmplEstres(_req:any,res:any){

    const nivestres = await EstresNiveles.findAll({
      attributes: ["nombre", "cantidad"],
    })

    const response = nivestres.map((nivel) => ({
      nivel: nivel.nombre,
      cantidad: nivel.cantidad,
    }));

    return res.status(200).json(response);
  }
}


export default MetricasController;
