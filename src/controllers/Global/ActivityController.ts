import database from "../../config/database";
class ActivityController {
  async addActivity(req: any, res: any) {
    const { description, date } = req.body;
    const userId = req.user.id; // User ID from token (asumimos que el token contiene el ID del usuario)
    const connection = database.getConnection();
    if (!connection)
      return res.status(400).json({ message: "la conecion fallo" });
    connection.query({
      query:
        "INSERT INTO activities (user_id, description, date) VALUES (?, ?, ?)",
      values: [userId, description, date],
    });
    res.status(201).json({ message: "Activity added successfully" });
  }
  async getUserActivities(req: any, res: any) {
    const userId = req.user.id; // ID del usuario autenticado desde el token
    const connection = database.getConnection();
    if (!connection)
      return res.status(400).json({ message: "la conecion fallo" });
    const result = connection.query({
      query: "SELECT * FROM activities WHERE user_id = ?",
      values: [userId],
    });
    return res.status(200).json(result);
  }
}
export default new ActivityController();
