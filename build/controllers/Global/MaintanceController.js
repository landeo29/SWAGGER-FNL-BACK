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
const ageRange_1 = require("../../models/User/ageRange");
const gender_1 = require("../../models/User/gender");
const hierarchical_level_1 = require("../../models/User/hierarchical_level");
const responsabilityLevel_1 = require("../../models/User/responsabilityLevel");
class MaintanceController {
    RangeAge(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ageRanges = yield ageRange_1.AgeRange.findAll(); // Consulta la base de datos para obtener los datos
                res.json({ results: ageRanges });
            }
            catch (error) {
                res.status(500).json({ error: "Error al obtener rango de edades" });
            }
        });
    }
    Hierarchical(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const levels = yield hierarchical_level_1.Hierarchical_level.findAll(); // Consulta a la base de datos
                res.json({ results: levels });
            }
            catch (error) {
                res.status(500).json({ error: "Error al obtener niveles jerárquicos" });
            }
        });
    }
    Responsability(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const levels = yield responsabilityLevel_1.ResponsabilityLevel.findAll(); // Consulta la base de datos para obtener los datos
                res.json({ results: levels });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: "Error al obtener niveles de responsabilidad" });
            }
        });
    }
    Gender(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const genders = yield gender_1.Gender.findAll(); // Consulta la base de datos para obtener los géneros
                res.json({ results: genders });
            }
            catch (error) {
                res.status(500).json({ error: "Error al obtener géneros" });
            }
        });
    }
}
exports.default = new MaintanceController();
