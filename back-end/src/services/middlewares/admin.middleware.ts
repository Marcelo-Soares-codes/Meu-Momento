import { Request, Response, NextFunction } from "express";
import { getById } from "../../repositorys/user.repository";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Verifica se o usuário está presente na solicitação e se ele tem a propriedade 'id' definida
  if (!req.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Verifica se o ID do usuário corresponde ao ID do administrador (substitua 'adminId' pelo ID real do administrador)
  const user = await getById(req.id);

  // Verifica se o usuário foi encontrado
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Verifica se o usuário possui a função de administrador
  if (user.role !== "ADMINISTRATOR") {
    return res.status(403).json({ error: "Forbidden" });
  }

  // Se o usuário for um administrador, continue para o próximo middleware
  next();
};
