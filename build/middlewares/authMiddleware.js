"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitOpenAi = void 0;
exports.Authorization = Authorization;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/*
function verifyToken(req: any, res: any, next: any) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      throw new Error("No token provided, authorization denied");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Invalid token format");
    }
    const jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) {
      throw new Error("jwt secret unknow");
    }
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Session Expired",
        error: error.message,
      });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid Token",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Internal server Error",
      error: error,
    });
  }
}
 */
function Authorization(req, res, next) {
    var _a;
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({
            message: "No Authorization Header",
        });
    }
    try {
        const token = authorization.split(" ")[1];
        console.log("token: ", token);
        if (!token) {
            return res.status(401).json({
                message: "Invalid Token Format",
            });
        }
        const secret = (_a = process.env.SECRET_KEY) !== null && _a !== void 0 ? _a : '';
        const decode = jsonwebtoken_1.default.verify(token, secret);
        req.userId = decode;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({
                message: "Session Expired",
                error: error.message,
            });
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({
                message: "Invalid Token",
                error: error.message,
            });
        }
        res.status(500).json({
            message: "Internal server Error",
            error: error.message,
            stack: error.stack,
        });
    }
}
const limitRequestOpenAi = 20;
const rateLimitOpenAi = (0, express_rate_limit_1.default)({
    windowMs: 24 * 60 * 60 * 1000,
    max: limitRequestOpenAi,
    message: {
        status: 429,
        error: `Has superado el limite de ${limitRequestOpenAi} solicitudes por dia`,
    },
    keyGenerator: (req) => {
        var _a;
        const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            throw new Error("No token provided, authorization denied");
        }
        const decoded = jsonwebtoken_1.default.decode(token);
        if (decoded && typeof decoded === "object" && "userId" in decoded) {
            return decoded.userId;
        }
        throw new Error("Invalid token format: userId not found");
    },
    standardHeaders: true,
    legacyHeaders: true,
});
exports.rateLimitOpenAi = rateLimitOpenAi;
