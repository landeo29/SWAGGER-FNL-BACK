import moment from "moment-timezone";
import { Message } from "../../models/ChatBot/message";
import { Op, Sequelize } from "sequelize";
import { User } from "../../models/User/user";

class MessageController {
  async saveMessage(req: any, res: any) {
    const { content, userId } = req.body;
    const localDate = moment.tz(new Date(), "America/Lima"); // Obtener la hora actual en la zona horaria local
    try {
      const message = await Message.create({
        content,
        user_id: userId,
        user_id_receptor: 1, // O el valor adecuado según tu lógica
        created_at: localDate.toDate(), // Convertir el objeto moment a una fecha JavaScript
      });

      res
        .status(201)
        .json({ message: "Mensaje guardado correctamente.", data: message });
    } catch (error) {
      console.error("Error al guardar el mensaje:", error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  }
  async saveMessageFromBot(req: any, res: any) {
    const { content, userId } = req.body;
    const localDate = moment.tz(new Date(), "America/Lima"); // Obtener la hora actual en la zona horaria local
    try {
      const message = await Message.create({
        content,
        user_id: 1, // El bot
        user_id_receptor: userId,
        created_at: localDate.toDate(), // Convertir el objeto moment a una fecha JavaScript
      });

      res
        .status(201)
        .json({ message: "Mensaje guardado correctamente.", data: message });
    } catch (error) {
      console.error("Error al guardar el mensaje del bot:", error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  }
  async getFilteredMessages(req: any, res: any) {
    const userId = parseInt(req.query.userId);
    const limit = parseInt(req.query.limit) || 20; // Número de mensajes por lote
    const offset = parseInt(req.query.offset) || 0; // Desplazamiento inicial

    try {
      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            { user_id: userId },
            { user_id_receptor: userId },
          ],
        },
        order: [["id", "DESC"]],
        limit,
        offset,
      });

      const messagesWithLocalTime = messages.map((message) => {
        const utcDate = moment.utc(message.created_at);
        const zonedDate = utcDate.tz("America/Lima");
        return {
          ...message.toJSON(),
          created_at: zonedDate.format("YYYY-MM-DD HH:mm:ss"),
        };
      });

      res.status(200).json(messagesWithLocalTime);
    } catch (error) {
      console.error("Error fetching filtered messages:", error);
      res.status(500).json({ error: "Error fetching filtered messages" });
    }
  }
  async getAllMessages(_req: any, res: any) {
    try {
      const messages = await Message.findAll();
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Error fetching messages" });
    }
  }

  async getUserInteractionsByDate(req: any, res: any) {
    try {
        const { userId, date } = req.params; // Obtener ID de usuario y fecha (YYYY-MM-DD)

        // Convertir la fecha en formato local
        const selectedDate = moment.tz(date, "America/Lima").startOf('day'); 
        const endOfSelectedDate = moment.tz(date, "America/Lima").endOf('day');

        // Contar las interacciones del usuario en la fecha específica
        const interactionCount = await Message.count({
            where: {
                user_id: userId,
                created_at: {
                    [Op.between]: [selectedDate.toDate(), endOfSelectedDate.toDate()],
                },
            },
        });

        return res.status(200).json({
            userId,
            date,
            interactions: interactionCount,
            usedFuncy: interactionCount > 0, // True si el usuario usó Funcy ese día
        });
    } catch (error) {
        console.error("Error al obtener interacciones por fecha:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
    }
  }

  
  async getUserDailyInteractions(req: any, res: any) {
    try {
        const { userId } = req.params; // Obtener el ID del usuario
        const localDate = moment.tz(new Date(), "America/Lima").startOf('day'); // Inicio del día actual
        const endOfDay = moment.tz(new Date(), "America/Lima").endOf('day'); // Fin del día actual

        // Contar los mensajes enviados por el usuario en el día
        const interactionCount = await Message.count({
            where: {
                user_id: userId,
                created_at: {
                    [Op.between]: [localDate.toDate(), endOfDay.toDate()],
                },
            },
        });

        return res.status(200).json({ userId, interactionsToday: interactionCount });
    } catch (error) {
        console.error("Error al obtener interacciones diarias del usuario:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
    }
  }

  async getTotalDailyInteractions(_req: any, res: any) {
    try {
        const localDate = moment.tz(new Date(), "America/Lima").startOf('day'); // Inicio del día actual
        const endOfDay = moment.tz(new Date(), "America/Lima").endOf('day'); // Fin del día actual

        // Contar todos los mensajes del día, sin importar el usuario
        const totalInteractions = await Message.count({
            where: {
                created_at: {
                    [Op.between]: [localDate.toDate(), endOfDay.toDate()],
                },
            },
        });

        return res.status(200).json({ totalInteractionsToday: totalInteractions });
    } catch (error) {
        console.error("Error al obtener interacciones totales diarias:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
    }
  }

  async getUserUsageDays(req: any, res: any) {
    try {
        const { userId } = req.params;

        // Obtener la primera y última fecha de interacción del usuario
        const firstInteraction = await Message.findOne({
            where: { user_id: userId },
            order: [["created_at", "ASC"]],
            attributes: ["created_at"],
        });

        const lastInteraction = await Message.findOne({
            where: { user_id: userId },
            order: [["created_at", "DESC"]],
            attributes: ["created_at"],
        });

        if (!firstInteraction || !lastInteraction) {
            return res.status(200).json({
                userId,
                usedDays: 0,
                notUsedDays: 0,
                totalDays: 0,
            });
        }

        // Convertir fechas al formato local (America/Lima)
        const startDate = moment.tz(firstInteraction.created_at, "America/Lima").startOf("day");
        const endDate = moment.tz(lastInteraction.created_at, "America/Lima").endOf("day");

        // Calcular el total de días en el rango
        const totalDays = endDate.diff(startDate, "days") + 1;

        // Obtener todas las fechas en las que el usuario interactuó
        const interactions = await Message.findAll({
            where: {
                user_id: userId,
                created_at: {
                    [Op.between]: [startDate.toDate(), endDate.toDate()],
                },
            },
            attributes: [
                [Sequelize.fn("DATE", Sequelize.col("created_at")), "interaction_date"],
            ],
            group: ["interaction_date"],
            raw: true,
        });

        // Contar los días en los que el usuario tuvo interacciones
        const usedDays = interactions.length;
        const notUsedDays = totalDays - usedDays;

        return res.status(200).json({
            userId,
            usedDays,
            notUsedDays,
            totalDays,
        });
    } catch (error) {
        console.error("Error al obtener días de uso de Funcy:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
    }
}


  async getStatsFuncy(_req: any, res: any) {
    try {
      const now = new Date();
      const startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Primer día del mes actual
      const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Último día del mes actual
  
      // Obtener todos los usuarios (excluyendo el bot)
      const usersall = await User.findAll({
        where: {
          id: {
            [Op.ne]: 1, // Excluye el bot (user_id = 1)
          },
        },
      });
      const totalUserCount = usersall.length;
  
      // Crear un arreglo para guardar los detalles por día
      const detalles: Array<{
        dia: string;
        porcentaje_uso: number;
        porcentaje_no_uso: number;
        users_using: number;
        users_not_using: number;
      }> = [];
  
      // Iterar por cada día del mes
      for (let day = 1; day <= endDate.getDate(); day++) {
        const dayStart = new Date(now.getFullYear(), now.getMonth(), day); // Inicio del día
        const dayEnd = new Date(now.getFullYear(), now.getMonth(), day + 1); // Fin del día
  
        // Obtener los mensajes dentro del rango de este día
        const dailyUsos = await Message.findAll({
          where: {
            user_id: {
              [Op.ne]: 1, // Excluye los mensajes enviados por el bot (user_id = 1)
            },
            created_at: {
              [Op.between]: [dayStart, dayEnd],
            },
          },
          attributes: ['user_id'],
          group: ['user_id'],
        });
  
        // Calcular los usuarios que usaron y no usaron el sistema
        const dailyUniqueUsers = dailyUsos.length; // Usuarios únicos que usaron el sistema
        const dailyUsersNotUsing = totalUserCount - dailyUniqueUsers; // Usuarios que no usaron el sistema
  
        // Calcular los porcentajes
        const dailyPorcentajeUso = Math.round((dailyUniqueUsers * 100) / totalUserCount * 100) / 100;
        const dailyPorcentajeNoUso = Math.round((100 - dailyPorcentajeUso) * 100) / 100;
  
        // Agregar al arreglo de detalles
        detalles.push({
          dia: `Dia ${day}`, // Formato de fecha
          porcentaje_uso: dailyPorcentajeUso,
          porcentaje_no_uso: dailyPorcentajeNoUso,
          users_using: dailyUniqueUsers,
          users_not_using: dailyUsersNotUsing,
        });
      }
  
      // Calcular el porcentaje total del mes actual
      const usos = await Message.findAll({
        where: {
          user_id: {
            [Op.ne]: 1, // Excluye los mensajes enviados por el bot (user_id = 1)
          },
          created_at: {
            [Op.between]: [startDate, endDate], // Filtrar por rango de fechas
          },
        },
        attributes: ['user_id'],
        group: ['user_id'],
      });
  
      const uniqueUserCount = usos.length;
      const users_not_usings = totalUserCount - uniqueUserCount;
      const porcentaje = Math.round((uniqueUserCount * 100) / totalUserCount * 100) / 100;
      const porcentaje_not_usings = Math.round((100 - porcentaje) * 100) / 100;
  
      // Devolver el conteo de usuarios únicos, el porcentaje de uso y los detalles
      return res.status(200).json({
        users_using_global: uniqueUserCount,
        users_not_using_global: users_not_usings,
        porcentaje_uso_global: porcentaje,
        porcentaje_no_uso_global: porcentaje_not_usings,
        detalles, // Array con detalles por día
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Hubo un error al obtener los registros.' });
    }
  }
  
  
  
  
}
export default new MessageController();
