"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = __importDefault(require("./ChatBot/message"));
const estres_niveles_1 = __importDefault(require("./Clasificacion/estres_niveles"));
const estrestecnicas_1 = __importDefault(require("./Clasificacion/estrestecnicas"));
const tipotecnicas_1 = __importDefault(require("./Clasificacion/tipotecnicas"));
const userestressession_1 = __importDefault(require("./Clasificacion/userestressession"));
const empresas_1 = __importDefault(require("./Global/empresas"));
const userprograma_1 = __importDefault(require("./Program/userprograma"));
const test_estres_1 = __importDefault(require("./Test/test_estres"));
const test_estres_salida_1 = __importDefault(require("./Test/test_estres_salida"));
const ageRange_1 = __importDefault(require("./User/ageRange"));
const gender_1 = __importDefault(require("./User/gender"));
const hierarchical_level_1 = __importDefault(require("./User/hierarchical_level"));
const responsabilityLevel_1 = __importDefault(require("./User/responsabilityLevel"));
const user_1 = __importDefault(require("./User/user"));
const user_responses_1 = __importDefault(require("./User/user_responses"));
const models = [
    user_1.default,
    user_responses_1.default,
    responsabilityLevel_1.default,
    hierarchical_level_1.default,
    gender_1.default,
    ageRange_1.default,
    test_estres_1.default,
    test_estres_salida_1.default,
    empresas_1.default,
    message_1.default,
    estres_niveles_1.default,
    estrestecnicas_1.default,
    tipotecnicas_1.default,
    userestressession_1.default,
    userprograma_1.default
];
exports.default = models;
