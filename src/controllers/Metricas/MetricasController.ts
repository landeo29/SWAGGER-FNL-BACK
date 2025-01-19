//import { Sequelize } from "sequelize-typescript";
//import {  Sequelize } from "sequelize";
//import { UserEstresSession } from "../../models/Clasificacion/userestressession";
import { User } from "../../models/User/user";
import database from "../../config/database";
import { Message } from "../../models/ChatBot/message";
import { Op } from "sequelize";
import { endOfDay, startOfDay } from "date-fns";
//import moment from "moment";

class MetricasController {
  async TotalEmpleados(req: any, res: any) {
    try {
      const { empresa_id } = req.body;
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
      const { empresa_id } = req.body;
      const connection = database.getConnection();
      if (!connection) {
        return res
          .status(500)
          .json({ message: "Error de conexión a la base de datos" });
      }
      const usuariosPorEstres = await connection.query(
        "CALL ObtenerUsuariosPorEstres(:empresaId)",
        {
          replacements: { empresaId: empresa_id },
        }
      );

      if (!usuariosPorEstres)
        return res.status(404).json({ message: "no se encontraron datos" });
      return res.status(200).json({ usuariosPorEstres });
    } catch (error: any) {
      console.log("Error: ", error.message);
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
}
export default MetricasController;
