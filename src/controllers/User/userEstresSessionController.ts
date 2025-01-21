import { EstresNiveles } from "../../models/Clasificacion/estres_niveles";
import { UserEstresSession } from "../../models/Clasificacion/userestressession";
import { Sequelize } from 'sequelize';
import { User } from "../../models/User/user";
class UserEstresSessionController{

    // Función para obtener el estres_nivel_id por user_id
    async getEstresNivelByUserId(req: any, res: any){
        try {
            const userId = req.params.user_id;  // Obtener el user_id de los parámetros de la ruta
            const session = await UserEstresSession.findOne({
              where: { user_id: userId },  // Buscar la sesión por user_id
              attributes: ['estres_nivel_id']  // Solo devolver el estres_nivel_id
            });
        
            if (!session) {
              // Si no se encuentra la sesión
              return res.status(404).json({ message: 'Sesión no encontrada para este usuario' });
            }
        
            // Si se encuentra, devolver el estres_nivel_id
            res.status(200).json({ estres_nivel_id: session.estres_nivel_id });
          } catch (error) {
            // Manejo de errores
            console.error('Error al obtener el nivel de estrés por user_id:', error);
            res.status(500).json({ message: 'Error del servidor' });
          }
    }

    async assignEstresNivel(req: any, res: any){
        const { user_id, estres_nivel_id } = req.body;
    try {


        // Busca si ya existe una sesión de estrés para el usuario
        const existingSession = await UserEstresSession.findOne({ where: { user_id } });

        //Se verifica si el estres es diferente a Leve
        if (estres_nivel_id != 1){
          const estresNivel = await EstresNiveles.findOne({
            where: { id: estres_nivel_id }
          });

          if (!estresNivel) {
            console.log('No se encontró el registro con el id proporcionado.');
            res.status(500).json({ message: 'Error del servidor.' });
            return
          }
          
          //Se Suma en 1 a la cantidad contenida o se le asigna 1 en caso sea nulo
          const nuevaCantidad = estresNivel.cantidad ? estresNivel.cantidad + 1 : 1;
          await estresNivel.update({ cantidad: nuevaCantidad });
        }
        if (existingSession) {
            // Si la sesión ya existe, actualiza el estres_nivel_id
            existingSession.estres_nivel_id = estres_nivel_id;
            await existingSession.save();
            return res.status(200).json({ message: 'Nivel de estrés actualizado correctamente.' });
        } else {
            // Si no existe, crea una nueva sesión
            const newSession = await UserEstresSession.create({ user_id, estres_nivel_id });
            return res.status(200).json({ message: 'Nivel de estrés asignado correctamente.', data: newSession });
        }
    } catch (error) {
        console.error('Error al asignar el nivel de estrés:', error);
        res.status(500).json({ message: 'Error del servidor.' });
    }
    }

    async graficaEstresLevel(req: any, res: any) {
      const userId = req.params.userId;
      try {
        const result = await UserEstresSession.findAll({
          attributes: [
            [Sequelize.fn('DATE', Sequelize.col('created_at')), 'date'],
            Sequelize.col('estres_nivel_id') as unknown as string,
            [Sequelize.col('estres_nivel.nombre'), 'stress_level_name']
          ],
          where: {
            user_id: userId
          },
          include: [{
            model: EstresNiveles,
            as: 'estres_nivel',
            attributes: []
          }],
          group: [
            Sequelize.fn('DATE', Sequelize.col('created_at')),
            Sequelize.col('estres_nivel_id')
          ],
          order: [[Sequelize.fn('DATE', Sequelize.col('created_at')), 'DESC']]
        });
    
        const data = result.map(item => ({
          date: item.get('date'),
          stress_level_id: item.get('estres_nivel_id'),
          stress_level_name: item.get('stress_level_name')
        }));
    
        return res.status(200).json(data);
      } catch (error) {
        console.error('Error al obtener los niveles de estrés:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
    }    
    async promedioEstresEmpresaPorDia(req: any, res: any) {
      const userId = req.userId.userId;
      console.log(userId);
      try {

        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    
        const empresaId = user.empresa_id;
    
        const result = await UserEstresSession.findAll({
          attributes: [
            [Sequelize.fn('DATE', Sequelize.col('created_at')), 'date'],
            [Sequelize.fn('AVG', Sequelize.col('estres_nivel_id')), 'average_stress_level']
          ],
          include: [{
            model: User,
            attributes: [],
            where: { empresa_id: empresaId },
            required: true
          }],
          group: [Sequelize.fn('DATE', Sequelize.col('created_at'))],
          order: [[Sequelize.fn('DATE', Sequelize.col('created_at')), 'DESC']]
        });
    
        const data = result.map(item => ({
          date: item.get('date'),
          average_stress_level: item.get('average_stress_level')
        }));
    
        return res.status(200).json(data);
      } catch (error) {
        console.error('Error al obtener el promedio de estrés por día de la empresa:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
    
}

export default new UserEstresSessionController();