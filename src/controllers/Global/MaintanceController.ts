import { AgeRange } from "../../models/User/ageRange";
import { Gender } from "../../models/User/gender";
import { Hierarchical_level } from "../../models/User/hierarchical_level";
import { ResponsabilityLevel } from "../../models/User/responsabilityLevel";

class MaintanceController {
  async RangeAge(_req: any, res: any) {
    try {
      const ageRanges = await AgeRange.findAll(); // Consulta la base de datos para obtener los datos
      res.json({ results: ageRanges });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener rango de edades" });
    }
  }
  async Hierarchical(_req: any, res: any) {
    try {
      const levels = await Hierarchical_level.findAll(); // Consulta a la base de datos
      res.json({ results: levels });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener niveles jerárquicos" });
    }
  }
  async Responsability(_req: any, res: any) {
    try {
      const levels = await ResponsabilityLevel.findAll(); // Consulta la base de datos para obtener los datos
      res.json({ results: levels });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener niveles de responsabilidad" });
    }
  }
  async Gender(_req: any, res: any) {
    try {
      const genders = await Gender.findAll(); // Consulta la base de datos para obtener los géneros
      res.json({ results: genders });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener géneros" });
    }
  }
}
export default new MaintanceController();
