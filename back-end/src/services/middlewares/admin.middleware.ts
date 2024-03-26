import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserDTO } from "../../DTOs/user.dto";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Verifica se o usuário está presente na solicitação e se ele tem a propriedade 'id' definida
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Verifica se o ID do usuário corresponde ao ID do administrador (substitua 'adminId' pelo ID real do administrador)
  if (req.user.id !== "adminId") {
    return res.status(403).json({ error: "Forbidden" });
  }

  // Se o usuário for um administrador, continue para o próximo middleware
  next();
};
