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
const test_estres_1 = require("../../models/Test/test_estres");
class TestEstresController {
    saveTestEstres(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nuevaRespuesta = yield test_estres_1.TestEstres.create(req.body);
                res.status(200).json(nuevaRespuesta);
            }
            catch (error) {
                console.log(error); // Ver el error exacto
                res
                    .status(400)
                    .json({ error: "No se pudo guardar la respuesta del test de estrés." });
            }
        });
    }
    getAllTestEstres(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuestas = yield test_estres_1.TestEstres.findAll();
                res.status(200).json(respuestas);
            }
            catch (error) {
                res
                    .status(500)
                    .json({
                    error: "No se pudieron recuperar las respuestas del test de estrés.",
                });
            }
        });
    }
}
exports.default = new TestEstresController();
