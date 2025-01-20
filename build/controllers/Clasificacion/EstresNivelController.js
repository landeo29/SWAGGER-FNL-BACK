"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const estres_niveles_1 = require("../../models/Clasificacion/estres_niveles");
class EstresNivelController {
    getNombreById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id; // Obtener el id de los parámetros de la ruta
                const estresNivel = yield estres_niveles_1.EstresNiveles.findByPk(id); // Buscar el nivel de estrés por su ID
                if (!estresNivel) {
                    // Si no se encuentra el nivel de estrés
                    return res
                        .status(404)
                        .json({ message: "Nivel de estrés no encontrado" });
                }
                // Si se encuentra, devolver el nombre
                res.status(200).json({ nombre: estresNivel.nombre });
            }
            catch (error) {
                // Manejo de errores
                console.error("Error al obtener el nombre del nivel de estrés:", error);
                res.status(500).json({ message: "Error del servidor" });
            }
        });
    }
}
exports.default = new EstresNivelController();
