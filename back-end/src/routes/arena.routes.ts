import { Express } from "express-serve-static-core";
import {
  create,
  login,
  getAll,
  getId,
  deleteId,
  addVideo,
  getVideosByArenaId,
} from "../controllers/arena.controller";
import { authenticateToken } from "../services/middlewares/auth.middleware";
import { isAdmin } from "../services/middlewares/admin.middleware";

const arenaRoutes = (app: Express) => {
  app.post("/arena/create", create);
  app.post("/arena/login", login);
  app.post("/arena/add-video", addVideo);

  app.get("/arenas", authenticateToken, getAll);
  app.get("/arena/:id", authenticateToken, getId);
  app.get("/arena/:id/videos", authenticateToken, getVideosByArenaId);

  app.delete("/arena/delete/:id", authenticateToken, isAdmin, deleteId);
};

export default arenaRoutes;
