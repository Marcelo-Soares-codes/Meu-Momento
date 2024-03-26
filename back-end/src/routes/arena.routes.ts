import { Express } from "express-serve-static-core";
import {
  create,
  login,
  getAll,
  getId,
  deleteId,
} from "../controllers/arena.controller";
import { authenticateToken } from "../services/middlewares/auth.middleware";
import { isAdmin } from "../services/middlewares/admin.middleware";

const arenaRoutes = (app: Express) => {
  app.post("/arena/create", create);
  app.post("/arena/login", login);

  app.get("/arenas", authenticateToken, getAll);
  app.get("/arena/:id", authenticateToken, getId);

  app.delete("/arena/delete/:id", authenticateToken, isAdmin, deleteId);
};

export default arenaRoutes;
