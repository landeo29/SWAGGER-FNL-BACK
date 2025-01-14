"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ageRange_1 = require("./User/ageRange");
const gender_1 = require("./User/gender");
const hierarchical_level_1 = require("./User/hierarchical_level");
const responsabilityLevel_1 = require("./User/responsabilityLevel");
const user_1 = require("./User/user");
const user_responses_1 = require("./User/user_responses");
/*
import Message from "./ChatBot/message";
import EstresNiveles from "./Clasificacion/estres_niveles";
import EstresTecnicas from "./Clasificacion/estrestecnicas";
import TipoTecnicas from "./Clasificacion/tipotecnicas";
import UserEstresSession from "./Clasificacion/userestressession";
import Empresas from "./Global/empresas";
import UserPrograma from "./Program/userprograma";
import Test_estres from "./Test/test_estres";
import Test_estres_salida from "./Test/test_estres_salida";
import AgeRange from "./User/ageRange";
import Gender from "./User/gender";
import Hierarchical_level from "./User/hierarchical_level";
import ResponsabilityLevel from "./User/responsabilityLevel";
import UserResponse from "./User/user_responses";

const models =[
    User,
    UserResponse,
    ResponsabilityLevel,
    Hierarchical_level,
    Gender,
    AgeRange,
    Test_estres,
    Test_estres_salida,
    Empresas,
    Message,
    EstresNiveles,
    EstresTecnicas,
    TipoTecnicas,
    UserEstresSession,
    UserPrograma
]*/
const models = [
    user_1.User,
    user_responses_1.UserResponses,
    responsabilityLevel_1.ResponsabilityLevel,
    hierarchical_level_1.Hierarchical_level,
    gender_1.Gender,
    ageRange_1.AgeRange,
];
exports.default = models;
