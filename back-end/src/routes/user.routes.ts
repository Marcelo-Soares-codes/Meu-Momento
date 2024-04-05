import { Express } from "express-serve-static-core";

import {
  confirmCreate,
  confirmRecoverPassword,
  create,
  deleteId,
  getAll,
  getId,
  getProfile,
  login,
  recoverPassword,
  updateInfoUser,
} from "../controllers/user.controller";
import { authenticateToken } from "../services/middlewares/auth.middleware";
import { isAdmin } from "../services/middlewares/admin.middleware";

const userRoutes = (app: Express) => {
  app.post("/user/create", create);
  app.post("/user/confirm", confirmCreate);
  app.post("/user/login", login);
  app.post("/user/recover-password", recoverPassword);
  app.post("/user/confirm-recover-password", confirmRecoverPassword);
  app.post("/user/update-info", authenticateToken, updateInfoUser);

  app.get("/users", getAll);
  app.get("/user/:id", authenticateToken, isAdmin, getId);
  app.get("/user/profile", authenticateToken, getProfile);

  app.delete("/user/delete/:id", authenticateToken, isAdmin, deleteId);
};

export default userRoutes;
