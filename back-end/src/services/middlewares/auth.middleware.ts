import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Definindo uma nova interface para adicionar a propriedade 'user' à solicitação do Express
declare global {
  namespace Express {
    interface Request {
      id?: string; // Adicionando a propriedade 'user' ao objeto de solicitação
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_PASS ?? "", (err, id) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.id = id as string; // Defina 'user' como o usuário decodificado
    next();
  });
};
