import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserDTO } from "../../DTOs/user.dto";

// Definindo uma nova interface para adicionar a propriedade 'user' à solicitação do Express
declare global {
  namespace Express {
    interface Request {
      user?: UserDTO; // Adicionando a propriedade 'user' ao objeto de solicitação
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

  jwt.verify(token, process.env.JWT_PASS ?? "", (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user as UserDTO; // Defina 'user' como o usuário decodificado
    next();
  });
};
