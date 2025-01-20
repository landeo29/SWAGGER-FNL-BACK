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
const empresas_1 = require("../../models/Global/empresas");
class EmpresaController {
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empresa = yield empresas_1.Empresas.findByPk(req.params.id);
                if (!empresa)
                    return res.status(404).json({ message: 'Empresa no encontrada' });
                res.status(200).json(empresa);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = EmpresaController;
