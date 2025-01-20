"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmpresaController_1 = __importDefault(require("../controllers/Global/EmpresaController"));
const EmpresaRouter = (0, express_1.Router)();
const empresaController = new EmpresaController_1.default();
EmpresaRouter.get("/:id", empresaController.getById);
exports.default = EmpresaRouter;
