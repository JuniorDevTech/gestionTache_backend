import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export default function protect(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "Accès refusé, token manquant",
    });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // ✅ Correction importante ici
    req.user = { _id: decoded.id };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token invalide ou expiré",
    });
  }
}
