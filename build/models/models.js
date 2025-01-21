"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("./ChatBot/message");
const estres_niveles_1 = require("./Clasificacion/estres_niveles");
//import { TipoTecnicas } from "./Clasificacion/tipotecnicas";
const userestressession_1 = require("./Clasificacion/userestressession");
const empresas_1 = require("./Global/empresas");
const userprograma_1 = require("./Program/userprograma");
const test_estres_1 = require("./Test/test_estres");
const test_estres_salida_1 = require("./Test/test_estres_salida");
const ageRange_1 = require("./User/ageRange");
const gender_1 = require("./User/gender");
const hierarchical_level_1 = require("./User/hierarchical_level");
const responsabilityLevel_1 = require("./User/responsabilityLevel");
const user_1 = require("./User/user");
const user_responses_1 = require("./User/user_responses");
const models = [
    user_1.User,
    user_responses_1.UserResponses,
    responsabilityLevel_1.ResponsabilityLevel,
    hierarchical_level_1.Hierarchical_level,
    gender_1.Gender,
    ageRange_1.AgeRange,
    estres_niveles_1.EstresNiveles,
    userestressession_1.UserEstresSession,
    test_estres_1.TestEstres,
    test_estres_salida_1.TestEstresSalida,
    message_1.Message,
    empresas_1.Empresas,
    userprograma_1.UserPrograma,
];
exports.default = models;
