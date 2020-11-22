import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "../config/auth";

export default async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: "JWT token não informado" });
  }

  const [, token] = authHeader.split(" ");

  try {
    await verify(token, authConfig.jwt.secret);
    return next();
  } catch {
    return res.status(404).json({ mensagem: "JWT token não esta valido" });
  }
}
