import { TestEstresSalida } from "../../models/Test/test_estres_salida";

class TestEstresSalidaController {
  async saveTestEstresSalida(req: any, res: any) {
    try {
      console.log(req.body); // Ver qué datos llegan al controlador
      const nuevaRespuesta = await TestEstresSalida.create(req.body);
      res.status(200).json(nuevaRespuesta);
    } catch (error) {
      console.log(error); // Ver el error exacto
      res
        .status(400)
        .json({ error: "No se pudo guardar la respuesta del test de estrés." });
    }
  }
  async getAllTestEstresSalida(_req: any, res: any) {
    try {
      const respuestas = await TestEstresSalida.findAll();
      res.status(200).json(respuestas);
    } catch (error) {
      res
        .status(500)
        .json({
          error: "No se pudieron recuperar las respuestas del test de estrés.",
        });
    }
  }

  async getUserTestEstresSalida(req:any, res: any){
    try {
      const { userid } = req.params;
      const respuestas = await TestEstresSalida.findOne({
        where:{
          user_id: userid
        }
      });

      if (!respuestas) {
        return res.status(404).json({ error: "Usuario no cuenta con test de estres de salida" });
      }

      res.status(200).json(respuestas);
    } catch (error) {
      res
        .status(500)
        .json({
          error: "No se pudieron recuperar las respuestas del test de estrés con ese usuario.",
        });
    }
  }
}
export default new TestEstresSalidaController();
