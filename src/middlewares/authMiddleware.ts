
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";

// Middleware para verificar el token JWT
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
    // Verificar el token
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded; // decoded contiene los datos del usuario (por ejemplo, el userId)
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

const limitRequestOpenAi = 20;
const rateLimitOpenAi = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: limitRequestOpenAi,
  message: {
    status: 429,
    error: `Has superado el limite de ${limitRequestOpenAi} solicitudes por dia`,
  },
  keyGenerator: (req: any) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw new Error("No token provided, authorization denied");
    }
    const decoded = jwt.decode(token);
    if (decoded && typeof decoded === "object" && "userId" in decoded) {
      return decoded.userId;
    }
    throw new Error("Invalid token format: userId not found");
  },
  standardHeaders: true,
  legacyHeaders: true,
});

export {
  verifyToken,
  rateLimitOpenAi,
};
