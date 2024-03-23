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
} from "../controllers/user.controller";

const userRoutes = (app: Express) => {
  app.post("/user/create", create);
  app.post("/user/confirm", confirmCreate);
  app.post("/user/login", login);
  app.post("/user/recoverPassword", recoverPassword);
  app.post("/user/confirmRecoverPassword", confirmRecoverPassword);

  app.get("/users", getAll);
  app.get("/user/:id", getId);
  app.get("/user/profile", getProfile);

  app.delete("/user/delete/:id", deleteId);
};

export default userRoutes;
