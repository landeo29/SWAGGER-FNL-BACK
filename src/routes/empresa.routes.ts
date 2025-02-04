import { Router } from "express";
import EmpresaController from "../controllers/Global/EmpresaController";
import { Authorization } from "../middlewares/authMiddleware";

const EmpresaRouter = Router();
const empresaController = new EmpresaController();

EmpresaRouter.get("/:id", empresaController.getById)

EmpresaRouter.get("/:id/distribucionsedes", Authorization, empresaController.getDistribucionSedePorEmpresa);


export default EmpresaRouter;