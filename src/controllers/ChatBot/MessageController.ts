import moment from "moment-timezone";
import { Message } from "../../models/ChatBot/message";
import { Op } from "sequelize";

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
            { user_id: userId, user_id_receptor: 1 },
            { user_id: 1, user_id_receptor: userId },
          ],
        },
        order: [["created_at", "DESC"]],
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
}
export default new MessageController();
