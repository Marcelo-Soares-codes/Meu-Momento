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
    email.toLowerCase();

    // Check if the arena really exists
    const arena = await getByEmail(email);
    if (!arena) {
      throw new Error("Invalid email or password");
    }

    // Check if the password is correct
    const verifyPass = await bcrypt.compare(password, arena.password);
    if (!verifyPass) {
      throw new Error("Invalid email or password");
    }

    // Remove the password from the arena before sending
    const { password: _, ...arenaLogin } = arena;

    // Generate JWT token
    const token = jwt.sign({ data: arenaLogin }, process.env.JWT_PASS ?? "", {
      expiresIn: "8h",
    });

    // Respond with success and send arena data and JWT token
    res.status(200).json({ success: true, data: { arena: arenaLogin, token } });
  } catch (error) {
    handleError(error, res, "Error while logging in");
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    email.toLowerCase();

    // Check if the arena already exists
    const arenaExistent = await getByEmail(email);
    if (arenaExistent) {
      throw new Error("Email already exists!");
    }
    const arenaByName = await getByName(name);
    if (arenaByName) {
      throw new Error("It seems that this name is already being used!");
    }

    // Validate arena data input
    await arenaValidation.validate(req.body);

    // Password hash
    const hashPassword = await bcrypt.hash(password, 10);
    req.body.password = hashPassword;

    // Create arena
    const newArena = await createArena(req.body);

    // Return success and new arena data
    res.status(201).json({ success: true, data: newArena });
  } catch (error) {
    handleError(error, res, "Error creating arena");
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    // Get all arenas
    const arena = await getAllArenas();

    // Respond with obtained arenas
    res.status(200).json({ success: true, data: arena });
  } catch (error) {
    handleError(error, res, "Error getting Arenas");
  }
};

export const getId = async (req: Request, res: Response) => {
  try {
    // Get arena by ID
    const arena = await getById(req.params.id);

    // If arena is not found, return a 404 error
    if (!arena) {
      res.status(404).json({ success: false, error: "Arena not found" });
      return;
    }

    // Respond with obtained arena
    res.status(200).json({ success: true, data: arena });
  } catch (error) {
    handleError(error, res, "Error getting Arena");
  }
};

export const addVideo = async (req: Request, res: Response) => {
  try {
    const { title, arenaId } = req.body;
    const videoBytes = req.file?.buffer;

    if (!videoBytes) {
      throw new Error("Video file not found");
    }

    const newVideo = { title, file: videoBytes };

    addVideoToArena(arenaId, newVideo);

    // Return success and new video data
    res.status(201).json({ success: true, data: newVideo });
  } catch (error) {
    handleError(error, res, "Error adding video to arena");
  }
};

export const deleteId = async (req: Request, res: Response) => {
  try {
    // Get arena by ID
    const { deleted, message } = await deleteById(req.params.id);

    // If arena is not found, return a 404 error
    if (!deleted) {
      res.status(404).json({ success: false, error: "Arena not found" });
      return;
    }

    // Respond with obtained arena
    res.status(200).json({ success: true, message });
  } catch (error) {
    handleError(error, res, "Error deleting Arena");
  }
};

const handleError = (error: any, res: Response, errorMessage: string) => {
  // Setting status code (Bad Request) and creating default message
  const status = 400;
  const defaultMessage = "Unknown error";

  // Building error message for console
  const errorMessageToLog = `${errorMessage}: ${error.message}`;
  // Determining error message to be sent to client based on error type
  const errorMessageToSend =
    error instanceof Error ? error.message : defaultMessage;

  // Sending error response to client
  console.error(errorMessageToLog);
  res.status(status).json({ success: false, error: errorMessageToSend });
};
