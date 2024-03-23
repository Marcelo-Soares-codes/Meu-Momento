import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "email-validator";

import {
  createUser,
  deleteById,
  getAllUsers,
  getByEmail,
  getById,
  updatedPassword,
} from "../repositorys/user.repository";

import { userValidation } from "../validations/user.validation";
import { sendConfirmationEmail } from "../services/nodemailer/confirmEmail.service";
import { UserDTO } from "../DTOs/user.dto";
import { sendRecoverPassword } from "../services/nodemailer/recoverPassword.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Verificar se o usuário realmente existe
    const user = await getByEmail(email);
    if (!user) {
      throw new Error("Email ou senha inválidos");
    }

    // Verificar se a senha está correta
    const verifyPass = await bcrypt.compare(password, user.password);
    if (!verifyPass) {
      throw new Error("Email ou senha inválidos");
    }

    // Remover a senha do usuário antes de enviar
    const { password: _, ...userLogin } = user;

    // Gerar token JWT
    const token = jwt.sign({ data: userLogin }, process.env.JWT_PASS ?? "", {
      expiresIn: "8h",
    });

    // Responder com sucesso e enviar os dados do usuário e o token JWT
    res.status(200).json({ success: true, data: { user: userLogin, token } });
  } catch (error) {
    handleError(error, res, "Erro ao fazer login");
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;

    // Verificar se o cabeçalho de autorização está presente
    if (!authorization) {
      throw new Error("Cabeçalho de autorização não encontrado!");
    }

    // Extrair apenas o token do cabeçalho de autorização
    const token = authorization.split(" ")[1];

    // Verificar se o token é válido
    const decodedToken = jwt.verify(token, process.env.JWT_PASS ?? "") as {
      id: string;
    };

    // Obter o ID do usuário do token decodificado
    const userId = decodedToken.id;

    // Obter o usuário pelo ID
    const user = await getById(userId);

    // Verificar se o usuário existe
    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    // Responder com os dados do usuário
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    handleError(error, res, "Erro ao obter perfil do usuário");
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Verificar se o e-mail fornecido é válido
    if (!validate(email)) {
      throw new Error("E-mail inválido!");
    }

    // Verificar se o usuário já existe
    const userExists = await getByEmail(email);
    if (userExists) {
      throw new Error("Email já existente!");
    }

    // Validar entrada (por exemplo, formato do email, força da senha, etc.)
    await userValidation.validate(req.body);

    // Hash da senha
    const hashPassword = await bcrypt.hash(password, 10);
    req.body.password = hashPassword;

    // Criar o usuário
    //const newUser = await createUser(req.body);

    // Gerar token JWT
    const token = jwt.sign({ user: req.body }, process.env.JWT_PASS ?? "", {
      expiresIn: "10m",
    });

    await sendConfirmationEmail(email, token);

    // Retornar sucesso e dados do novo usuário
    res.status(201).json({ success: true, token });
  } catch (error) {
    handleError(error, res, "Erro ao criar usuário");
  }
};

export const confirmCreate = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;

    // Verificar se o cabeçalho de autorização está presente
    if (!authorization) {
      throw new Error("Cabeçalho de autorização não encontrado!");
    }

    // Extrair apenas o token do cabeçalho de autorização
    const token = authorization.split(" ")[1];

    // Verificar se o token é válido
    const decodedToken = jwt.verify(token, process.env.JWT_PASS ?? "") as {
      user: UserDTO;
    };

    const { user } = decodedToken;

    // Verificar se o e-mail fornecido é válido
    if (!validate(user.email)) {
      throw new Error("E-mail inválido!");
    }

    // Verificar se o usuário já existe
    const userExists = await getByEmail(user.email);
    if (userExists) {
      throw new Error("Email já existente!");
    }

    const newUser = await createUser(user);

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    handleError(error, res, "Erro ao confirmar criação de usuário");
  }
};

export const recoverPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;

    // Verificar se o e-mail fornecido é válido
    if (!validate(email)) {
      throw new Error("E-mail inválido!");
    }

    // Verificar se o usuário existe
    const user = await getByEmail(email);
    if (!user) {
      throw new Error("E-mail não encontrado!");
    }

    // Hash da nova senha
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;

    // Gerar token JWT
    const token = jwt.sign({ user }, process.env.JWT_PASS ?? "", {
      expiresIn: "10m", // Defina o tempo de expiração do token
    });

    // Enviar e-mail de recuperação de senha
    await sendRecoverPassword(email, token);

    // Responder ao cliente
    res.status(201).json({
      success: true,
      message:
        "Senha recuperada com sucesso. Verifique seu e-mail para mais instruções.",
    });
  } catch (error) {
    handleError(error, res, "Erro ao confirmar criação de usuário");
  }
};

export const confirmRecoverPassword = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;

    // Verificar se o cabeçalho de autorização está presente
    if (!authorization) {
      throw new Error("Cabeçalho de autorização não encontrado!");
    }

    // Extrair apenas o token do cabeçalho de autorização
    const token = authorization.split(" ")[1];

    // Verificar se o token é válido
    const decodedToken = jwt.verify(token, process.env.JWT_PASS ?? "") as {
      user: { email: string; password: string };
    };
    const { email, password } = decodedToken.user;

    // Verificar se o e-mail fornecido é válido
    if (!validate(email)) {
      throw new Error("E-mail inválido!");
    }

    // Verificar se o usuário existe
    const userExists = await getByEmail(email);
    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    // Atualizar a senha do usuário
    const updatedUser = await updatedPassword(email, password);

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    handleError(error, res, "Erro ao confirmar recuperação de senha");
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    // Obter todos os usuários
    const users = await getAllUsers();

    // Responder com os usuários obtidos
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    handleError(error, res, "Erro ao obter usuários");
  }
};

export const getId = async (req: Request, res: Response) => {
  try {
    // Obter o usuário pelo ID
    const user = await getById(req.params.id);

    // Se o usuário não for encontrado, retorne um erro 404
    if (!user) {
      res.status(404).json({ success: false, error: "Usuário não encontrado" });
      return;
    }

    // Responder com o usuário obtido
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    handleError(error, res, "Erro ao obter usuário");
  }
};

export const deleteId = async (req: Request, res: Response) => {
  try {
    // Obter o usuário pelo ID
    const { deleted, message } = await deleteById(req.params.id);

    // Se o usuário não for encontrado, retorne um erro 404
    if (!deleted) {
      res.status(404).json({ success: false, error: "Usuário não encontrado" });
      return;
    }

    // Responder com o usuário obtido
    res.status(200).json({ success: true, message });
  } catch (error) {
    handleError(error, res, "Erro ao deletar usuário");
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
