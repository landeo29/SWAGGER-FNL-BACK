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
import User from "./User/user";
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
]
export default models;
