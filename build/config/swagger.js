"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: "3.0.3",
    info: {
        title: "FNL api",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:3000",
        },
        {
            url: "https://fnlapi.com"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
        schemas: {
            login: {
                type: "object",
                properties: {
                    username: {
                        type: "string",
                        example: "paul"
                    },
                    password: {
                        type: "string",
                        example: "contrasena"
                    }
                }
            },
            user: {
                type: "object",
                properties: {
                    username: {
                        type: "string",
                        example: "paul"
                    },
                    password: {
                        type: "string",
                        example: "contrasena"
                    },
                    email: {
                        type: "string",
                        example: "example@gmail.com"
                    }
                },
            },
        },
    },
};
const swaggerOptions = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"],
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
