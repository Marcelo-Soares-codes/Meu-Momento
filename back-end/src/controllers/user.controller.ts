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
  updateInfo,
} from "../repositorys/user.repository";

import {
  recoverPasswordValidation,
  userValidation,
} from "../validations/user.validation";
import { sendConfirmationEmail } from "../services/nodemailer/confirmEmail.service";
import { UserDTO } from "../DTOs/user.dto";
import { sendRecoverPassword } from "../services/nodemailer/recoverPassword.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    email.toLowerCase();

    // Check if the user really exists
    const user = await getByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Check if the password is correct
    const verifyPass = await bcrypt.compare(password, user.password);
    if (!verifyPass) {
      throw new Error("Invalid email or password");
    }

    // Remove the password from the user before sending
    const { password: _, ...userLogin } = user;

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "");

    // Respond with success and send user data and JWT token
    res.status(200).json({ success: true, data: { user: userLogin, token } });
  } catch (error) {
    handleError(error, res, "Error logging in");
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;

    // Check if authorization header is present
    if (!authorization) {
      throw new Error("Authorization header not found!");
    }

    // Extract only the token from the authorization header
    const token = authorization.split(" ")[1];

    // Check if the token is valid
    const decodedToken = jwt.verify(token, process.env.JWT_PASS ?? "") as {
      id: string;
    };

    // Get user ID from decoded token
    const userId = decodedToken.id;

    // Get user by ID
    const user = await getById(userId);

    // Check if the user exists
    if (!user) {
      throw new Error("User not found!");
    }

    // Respond with user data
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    handleError(error, res, "Error getting user profile");
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    email.toLowerCase();

    // Check if the provided email is valid
    if (!validate(email)) {
      throw new Error("Invalid email!");
    }

    // Check if user already exists
    const userExists = await getByEmail(email);
    if (userExists) {
      throw new Error("Email already exists!");
    }

    // Validate input (e.g., email format, password strength, etc.)
    await userValidation.validate(req.body);

    // Password hash
    const hashPassword = await bcrypt.hash(password, 10);
    req.body.password = hashPassword;

    // Create the user
    //const newUser = await createUser(req.body);

    // Generate JWT token
    const token = jwt.sign({ user: req.body }, process.env.JWT_PASS ?? "", {
      expiresIn: "10m",
    });

    await sendConfirmationEmail(email, token);

    // Return success and new user data
    res.status(201).json({ success: true, token });
  } catch (error) {
    handleError(error, res, "Error creating user");
  }
};

export const confirmCreate = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;

    // Check if authorization header is present
    if (!authorization) {
      throw new Error("Authorization header not found!");
    }

    // Extract only the token from the authorization header
    const token = authorization.split(" ")[1];

    // Check if the token is valid
    const decodedToken = jwt.verify(token, process.env.JWT_PASS ?? "") as {
      user: UserDTO;
    };

    const { user } = decodedToken;

    // Check if the provided email is valid
    if (!validate(user.email)) {
      throw new Error("Invalid email!");
    }

    // Check if user already exists
    const userExists = await getByEmail(user.email);
    if (userExists) {
      throw new Error("Email already exists!");
    }

    const newUser = await createUser(user);

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    handleError(error, res, "Error confirming user creation");
  }
};

export const recoverPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    email.toLowerCase();

    // Check if the provided email is valid
    if (!validate(email)) {
      throw new Error("Invalid email!");
    }

    // Check if the user exists
    const user = await getByEmail(email);
    if (!user) {
      throw new Error("Email not found!");
    }

    //performs data validation
    await recoverPasswordValidation.validate(req.body);

    // Hash of the new password
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;

    // Generate JWT token
    const token = jwt.sign({ user }, process.env.JWT_PASS ?? "", {
      expiresIn: "10m", // Set token expiration time
    });

    // Send password recovery email
    await sendRecoverPassword(email, token);

    // Respond to client
    res.status(201).json({
      success: true,
      message:
        "Password successfully recovered. Check your email for further instructions.",
    });
  } catch (error) {
    handleError(error, res, "Error confirming user creation");
  }
};

export const confirmRecoverPassword = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;

    // Check if authorization header is present
    if (!authorization) {
      throw new Error("Authorization header not found!");
    }

    // Extract only the token from the authorization header
    const token = authorization.split(" ")[1];

    // Check if the token is valid
    const decodedToken = jwt.verify(token, process.env.JWT_PASS ?? "") as {
      user: { email: string; password: string };
    };
    const { email, password } = decodedToken.user;
    email.toLowerCase();

    // Check if the provided email is valid
    if (!validate(email)) {
      throw new Error("Invalid email!");
    }

    // Check if the user exists
    const userExists = await getByEmail(email);
    if (!userExists) {
      throw new Error("User not found");
    }

    // Update user password
    const updatedUser = await updatedPassword(email, password);

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    handleError(error, res, "Error confirming password recovery");
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
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }

    // Responder com o usuário obtido
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    handleError(error, res, "Error getting user");
  }
};

export const updateInfoUser = async (req: Request, res: Response) => {
  try {
    const { id, name: newName, ...restData } = req.body;
    console.log(restData);

    // Obter o usuário existente pelo ID
    const currentUser = await getById(id);

    if (!currentUser) {
      throw new Error("User not found");
    }

    // Verificar se o novo nome é diferente do nome atual do usuário
    if (newName && newName !== currentUser.name) {
      // Verificar se o novo nome já está em uso
      const existingUserWithName = await getByEmail(newName);
      if (existingUserWithName && existingUserWithName.id !== id) {
        return res
          .status(400)
          .json({ success: false, message: "Username is already in use." });
      }
    }

    // Atualizar as informações do usuário
    const updatedUser = await updateInfo({
      id,
      name: newName,
      ...restData,
    });

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    handleError(error, res, "error when saving new information");
  }
};

export const deleteId = async (req: Request, res: Response) => {
  try {
    // Obter o usuário pelo ID
    const { deleted, message } = await deleteById(req.params.id);

    // Se o usuário não for encontrado, retorne um erro 404
    if (!deleted) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }

    // Responder com o usuário obtido
    res.status(200).json({ success: true, message });
  } catch (error) {
    handleError(error, res, "Error deleting user");
  }
};

const handleError = (error: any, res: Response, errorMessage: string) => {
  // Definindo o código de status (Bad Request) e criando menssagem padrão
  const status = 400;
  const defaultMessage = "Unknown error";

  // Montando a mensagem de erro para o console
  const errorMessageToLog = `${errorMessage}: ${error.message}`;
  // Determinando a mensagem de erro a ser enviada ao cliente com base no tipo de erro
  const errorMessageToSend =
    error instanceof Error ? error.message : defaultMessage;

  // Enviando a resposta de erro para o cliente
  console.error(errorMessageToLog);
  res.status(status).json({ success: false, error: errorMessageToSend });
};
