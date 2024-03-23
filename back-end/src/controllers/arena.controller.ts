import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  addVideoToArena,
  createArena,
  deleteById,
  getAllArenas,
  getByEmail,
  getById,
  getByName,
} from "../repositorys/arena.repository";
import { arenaValidation } from "../validations/arena.validation";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Verificar se a arena realmente existe
    const arena = await getByEmail(email);
    if (!arena) {
      throw new Error("Email ou senha inválidos");
    }

    // Verificar se a senha está correta
    const verifyPass = await bcrypt.compare(password, arena.password);
    if (!verifyPass) {
      throw new Error("Email ou senha inválidos");
    }

    // Remover a senha da arena antes de enviar
    const { password: _, ...arenaLogin } = arena;

    // Gerar token JWT
    const token = jwt.sign({ data: arenaLogin }, process.env.JWT_PASS ?? "", {
      expiresIn: "8h",
    });

    // Responder com sucesso e enviar os dados da arena e o token JWT
    res.status(200).json({ success: true, data: { arena: arenaLogin, token } });
  } catch (error) {
    handleError(error, res, "Erro ao realizar o login");
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se o Arena ja existe
    const arenaExistent = await getByEmail(email);
    if (arenaExistent) {
      throw new Error("Email já existente!");
    }
    const arenaByName = await getByName(name);
    if (arenaByName) {
      throw new Error("Parece que esse nome ja esta sendo usado!");
    }

    // Validar entrada de dados da arena
    await arenaValidation.validate(req.body);

    // Hash da senha
    const hashPassword = await bcrypt.hash(password, 10);
    req.body.password = hashPassword;

    // Criar a arena
    const newArena = await createArena(req.body);

    // Retornar sucesso e dados da nova arena
    res.status(201).json({ success: true, data: newArena });
  } catch (error) {
    handleError(error, res, "Erro ao criar a arena");
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    // Obter todos os arenas
    const arena = await getAllArenas();

    // Responder com os arenas obtidos
    res.status(200).json({ success: true, data: arena });
  } catch (error) {
    handleError(error, res, "Erro ao obter Arenas");
  }
};

export const getId = async (req: Request, res: Response) => {
  try {
    // Obter a arena pelo ID
    const arena = await getById(req.params.id);

    // Se a arena não for encontrada, retorne um erro 404
    if (!arena) {
      res.status(404).json({ success: false, error: "Arena não encontrado" });
      return;
    }

    // Responder com a arena obtida
    res.status(200).json({ success: true, data: arena });
  } catch (error) {
    handleError(error, res, "Erro ao obter Arena");
  }
};

export const addVideo = async (req: Request, res: Response) => {
  try {
    const { title, arenaId } = req.body;
    const videoBytes = req.file?.buffer;

    if (!videoBytes) {
      throw new Error("Arquivo de vídeo não encontrado");
    }

    const newVideo = { title, file: videoBytes };

    addVideoToArena(arenaId, newVideo);

    // Retornar sucesso e dados do novo vídeo
    res.status(201).json({ success: true, data: newVideo });
  } catch (error) {
    handleError(error, res, "Erro ao adicionar vídeo à arena");
  }
};

export const deleteId = async (req: Request, res: Response) => {
  try {
    // Obter a arena pelo ID
    const { deleted, message } = await deleteById(req.params.id);

    // Se a arena não for encontrada, retorne um erro 404
    if (!deleted) {
      res.status(404).json({ success: false, error: "Arena não encontrada" });
      return;
    }

    // Responder com a arena obtida
    res.status(200).json({ success: true, message });
  } catch (error) {
    handleError(error, res, "Erro ao deletar Arena");
  }
};

const handleError = (error: any, res: Response, errorMessage: string) => {
  // Definindo o código de status (Bad Request) e criando menssagem padrão
  const status = 400;
  const defaultMessage = "Erro desconhecido";

  // Montando a mensagem de erro para o console
  const errorMessageToLog = `${errorMessage}: ${error.message}`;
  // Determinando a mensagem de erro a ser enviada ao cliente com base no tipo de erro
  const errorMessageToSend =
    error instanceof Error ? error.message : defaultMessage;

  // Enviando a resposta de erro para o cliente
  console.error(errorMessageToLog);
  res.status(status).json({ success: false, error: errorMessageToSend });
};
