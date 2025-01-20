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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const userestressession_1 = require("../../models/Clasificacion/userestressession");
const userprograma_1 = require("../../models/Program/userprograma");
const user_1 = require("../../models/User/user");
const user_responses_1 = require("../../models/User/user_responses");
const OpenaiController_1 = __importDefault(require("../ChatBot/OpenaiController"));
const ageRange_1 = require("../../models/User/ageRange");
const responsabilityLevel_1 = require("../../models/User/responsabilityLevel");
const gender_1 = require("../../models/User/gender");
const hierarchical_level_1 = require("../../models/User/hierarchical_level");
const estres_niveles_1 = require("../../models/Clasificacion/estres_niveles");
class UserProgramaController {
    constructor() {
        this.createAndGenerateReport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const { user_id } = req.params; // Obtener el user_id de los parámetros de la URL
            let data = req.body; // Obtener el map pasado en el cuerpo de la solicitud
            // Eliminar 'estado' y 'user_id' del map
            delete data["estado"];
            delete data["user_id"];
            try {
                // Obtener datos del usuario, nivel de estrés y respuestas
                const user = yield user_1.User.findOne({
                    where: { id: user_id },
                    attributes: ["username", "email"],
                    include: [
                        {
                            model: user_responses_1.UserResponses,
                            include: [
                                {
                                    model: ageRange_1.AgeRange
                                },
                                {
                                    model: hierarchical_level_1.Hierarchical_level
                                },
                                {
                                    model: gender_1.Gender
                                },
                                {
                                    model: responsabilityLevel_1.ResponsabilityLevel
                                }
                            ]
                        },
                        {
                            model: userestressession_1.UserEstresSession,
                            include: [
                                {
                                    model: estres_niveles_1.EstresNiveles
                                }
                            ]
                        }
                    ]
                });
                if (!user) {
                    return res.status(404).json({
                        error: "No se encontraron los datos requeridos del usuario.",
                    });
                }
                const estres_nivel = (_a = user === null || user === void 0 ? void 0 : user.userestressessions.estres_nivel.nombre) !== null && _a !== void 0 ? _a : "Desconocido";
                const age_range = (_b = user === null || user === void 0 ? void 0 : user.userresponses.age_range.age_range) !== null && _b !== void 0 ? _b : "Desconocido";
                const hierarchical_level = (_c = user === null || user === void 0 ? void 0 : user.userresponses.hierarchical_level.level) !== null && _c !== void 0 ? _c : "Desconocido";
                const responsability_level = (_d = user === null || user === void 0 ? void 0 : user.userresponses.responsability_level.level) !== null && _d !== void 0 ? _d : "Desconocido";
                const gender = (user === null || user === void 0 ? void 0 : user.userresponses.gender.gender) || "Desconocido";
                const respuesta = this.generarTextorespuestas(data);
                yield OpenaiController_1.default.generateProgramsWithGemini(user_id, user.username, age_range, hierarchical_level, responsability_level, gender, estres_nivel, respuesta);
                console.log("Registros insertados correctamente en la tabla UserPrograma");
                res.status(200).json({
                    message: "Programa generado correctamente.",
                });
            }
            catch (error) {
                console.error("Error al generar el programa del usuario:", error);
                res.status(500).json({ error: "Error interno del servidor." });
            }
        });
        this.generarTextorespuestas = (respuestas) => {
            let textoFinal = "";
            // Iterar sobre las claves del objeto respuestas
            for (const key in respuestas) {
                if (respuestas.hasOwnProperty(key)) {
                    const pregunta = this.preguntasDefiniciones[key];
                    const respuesta = this.respuestaMap[respuestas[key]];
                    // Concatenar la pregunta y la respuesta
                    textoFinal += `Pregunta: ${pregunta} - Respuesta: ${respuesta}\n`;
                }
            }
            return textoFinal;
        };
        this.respuestaMap = {
            1: "Nunca",
            2: "Raras veces",
            3: "Ocasionalmente",
            4: "Algunas veces",
            5: "Frecuentemente",
            6: "Generalmente",
            7: "Siempre",
        };
        this.preguntasDefiniciones = {
            pregunta_1: "Tener que hacer reportes tanto para sus jefes como para las personas de su equipo le preocupa, porque siente que debe cumplir con las expectativas de todos y eso le genera tensión.",
            pregunta_2: "Si no puede controlar lo que sucede en su área de trabajo, se frustra, ya que le gusta tener todo bajo control y organizado.",
            pregunta_3: "Si no cuenta con el equipo necesario para hacer su trabajo, se siente estresado porque no puede hacerlo de la mejor manera.",
            pregunta_4: "Cuando su jefe no lo apoya o no habla bien de él frente a otros superiores, se siente solo y preocupado, pensando que no lo valoran.",
            pregunta_5: "Si siente que su jefe no lo trata con respeto o no valora su trabajo, le causa mucho estrés.",
            pregunta_6: "No sentirse parte de un equipo de trabajo unido le hace sentirse aislado y preocupado por no poder colaborar eficientemente con otros.",
            pregunta_7: "Cuando su equipo de trabajo no lo apoya en alcanzar sus metas, se siente estresado y frustrado.",
            pregunta_8: "Sentir que su equipo de trabajo no tiene buena reputación dentro de la empresa le provoca estrés, ya que desea que su equipo sea valorado.",
            pregunta_9: "La falta de claridad en la forma de trabajar dentro de la empresa le genera confusión y estrés.",
            pregunta_10: "Las políticas impuestas por la gerencia que dificultan su trabajo le causan frustración y estrés.",
            pregunta_11: "Cuando siente que no tiene suficiente control sobre su trabajo, igual que sus compañeros, se siente estresado y sin poder sobre lo que sucede.",
            pregunta_12: "Si percibe que su supervisor no se preocupa por su bienestar, se siente menospreciado y estresado.",
            pregunta_13: "No contar con el conocimiento técnico necesario para competir en la empresa le genera una sensación de inseguridad y estrés.",
            pregunta_14: "No tener un espacio privado para trabajar en tranquilidad le incomoda y le estresa.",
            pregunta_15: "La carga de papeleo excesivo en la empresa le resulta abrumadora y le provoca estrés.",
            pregunta_16: "La falta de confianza de su supervisor en su trabajo le hace sentir inseguro y estresado.",
            pregunta_17: "Si su equipo de trabajo está desorganizado, se siente ansioso porque no puede trabajar de manera efectiva.",
            pregunta_18: "Cuando su equipo no lo protege de las demandas laborales injustas de los jefes, se siente desamparado y estresado.",
            pregunta_19: "La falta de dirección clara y objetivos definidos en la empresa le genera estrés e incertidumbre.",
            pregunta_20: "Si siente que su equipo lo presiona demasiado, se estresa porque siente que no puede cumplir con todo.",
            pregunta_21: "Cuando no respetan a sus superiores, a él mismo, o a las personas que están por debajo de él, siente estrés e incomodidad.",
            pregunta_22: "Si su equipo de trabajo no le brinda apoyo técnico cuando lo necesita, se siente frustrado y estresado.",
            pregunta_23: "La falta de tecnología adecuada para realizar un trabajo de calidad le genera una gran presión y estrés.",
        };
    }
    getByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req.params; // Obtener el user_id de los parámetros
            try {
                const userProgramas = yield userprograma_1.UserPrograma.findAll({
                    where: { user_id }, // Filtrar por user_id
                });
                if (userProgramas.length === 0) {
                    return res
                        .status(404)
                        .json({ error: "No se encontraron programas para este usuario" });
                }
                res.status(200).json(userProgramas);
            }
            catch (error) {
                console.error("Error al obtener los programas de usuario:", error); // Imprimir el error en la consola
                res.status(500).json({
                    error: `Error al obtener los programas de usuario: ${error.message}`,
                }); // Enviar el mensaje de error
            }
        });
    }
    updateByUserAndTecnica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, id } = req.params; // Obtener user_id y ide de los parámetros
            const { comentario, estrellas } = req.body; // Obtener los campos que se quieren actualizar del body
            try {
                // Buscar el registro basado en user_id y
                const userPrograma = yield userprograma_1.UserPrograma.findOne({
                    where: {
                        user_id: user_id,
                        id: id,
                    },
                });
                if (!userPrograma) {
                    return res.status(404).json({ error: "Programa no encontrado" });
                }
                // Actualizar los campos comentario y estrellas si se pasan en el body
                userPrograma.comentario = comentario || userPrograma.comentario;
                userPrograma.estrellas =
                    estrellas !== undefined ? estrellas : userPrograma.estrellas;
                // Guardar los cambios en la base de datos
                if (userPrograma.completed_date == null)
                    userPrograma.completed_date = new Date();
                yield userPrograma.save();
                const nextProgram = yield userprograma_1.UserPrograma.findOne({
                    where: {
                        user_id: user_id,
                        dia: userPrograma.dia + 1,
                    },
                });
                if (nextProgram) {
                    nextProgram.start_date = (0, date_fns_1.addDays)(new Date(), 1);
                    yield nextProgram.save();
                }
                res.status(200).json({
                    message: "Programa actualizado con éxito",
                    userPrograma,
                });
            }
            catch (error) {
                console.error("Error al actualizar el programa de usuario:", error);
                res
                    .status(500)
                    .json({ error: "Error al actualizar el programa de usuario" });
            }
        });
    }
    // Obtener todos los registros de UserPrograma filtrados por user_id y ordenados por 'dia'
    getByUserIdAndOrderByDia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req.params;
            try {
                // Obtener los programas del usuario
                const userProgramas = yield userprograma_1.UserPrograma.findAll({
                    where: { user_id },
                    order: [["dia", "ASC"]],
                });
                if (userProgramas.length === 0) {
                    return res
                        .status(404)
                        .json({ error: "No se encontraron programas para este usuario" });
                }
                res.status(200).json({ userProgramas }); // Responder con los datos de ambas tablas
            }
            catch (error) {
                console.error("Error al obtener los programas de usuario:", error);
                res.status(500).json({
                    error: `Error al obtener los programas de usuario: ${error.message}`,
                });
            }
        });
    }
    // Obtener todos los registros de UserPrograma 
    getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userProgramas = yield userprograma_1.UserPrograma.findAll();
                res.status(200).json(userProgramas);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: "Error al obtener los programas de usuario" });
            }
        });
    }
    // Obtener un registro de UserPrograma por ID
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const userPrograma = yield userprograma_1.UserPrograma.findByPk(id);
                if (!userPrograma) {
                    return res.status(404).json({ error: "Programa no encontrado" });
                }
                res.status(200).json(userPrograma);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: "Error al obtener el programa de usuario" });
            }
        });
    }
    // Actualizar un registro de UserPrograma por ID
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { user_id, dia } = req.body;
            try {
                const userPrograma = yield userprograma_1.UserPrograma.findByPk(id);
                if (!userPrograma) {
                    return res.status(404).json({ error: "Programa no encontrado" });
                }
                userPrograma.user_id = user_id || userPrograma.user_id;
                userPrograma.dia = dia || userPrograma.dia;
                yield userPrograma.save();
                res.status(200).json(userPrograma);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: "Error al actualizar el programa de usuario" });
            }
        });
    }
    // Eliminar un registro de UserPrograma por ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const userPrograma = yield userprograma_1.UserPrograma.findByPk(id);
                if (!userPrograma) {
                    return res.status(404).json({ error: "Programa no encontrado" });
                }
                yield userPrograma.destroy();
                res.status(204).json({ message: "Programa eliminado con éxito" });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: "Error al eliminar el programa de usuario" });
            }
        });
    }
}
exports.default = UserProgramaController;
