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
const userestressession_1 = require("../../models/Clasificacion/userestressession");
class UserEstresSessionController {
    // Función para obtener el estres_nivel_id por user_id
    getEstresNivelByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.user_id; // Obtener el user_id de los parámetros de la ruta
                const session = yield userestressession_1.UserEstresSession.findOne({
                    where: { user_id: userId }, // Buscar la sesión por user_id
                    attributes: ['estres_nivel_id'] // Solo devolver el estres_nivel_id
                });
                if (!session) {
                    // Si no se encuentra la sesión
                    return res.status(404).json({ message: 'Sesión no encontrada para este usuario' });
                }
                // Si se encuentra, devolver el estres_nivel_id
                res.status(200).json({ estres_nivel_id: session.estres_nivel_id });
            }
            catch (error) {
                // Manejo de errores
                console.error('Error al obtener el nivel de estrés por user_id:', error);
                res.status(500).json({ message: 'Error del servidor' });
            }
        });
    }
    assignEstresNivel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, estres_nivel_id } = req.body;
            try {
                // Busca si ya existe una sesión de estrés para el usuario
                const existingSession = yield userestressession_1.UserEstresSession.findOne({ where: { user_id } });
                if (existingSession) {
                    // Si la sesión ya existe, actualiza el estres_nivel_id
                    existingSession.estres_nivel_id = estres_nivel_id;
                    yield existingSession.save();
                    return res.status(200).json({ message: 'Nivel de estrés actualizado correctamente.' });
                }
                else {
                    // Si no existe, crea una nueva sesión
                    const newSession = yield userestressession_1.UserEstresSession.create({ user_id, estres_nivel_id });
                    return res.status(200).json({ message: 'Nivel de estrés asignado correctamente.', data: newSession });
                }
            }
            catch (error) {
                console.error('Error al asignar el nivel de estrés:', error);
                res.status(500).json({ message: 'Error del servidor.' });
            }
        });
    }
}
exports.default = new UserEstresSessionController();
