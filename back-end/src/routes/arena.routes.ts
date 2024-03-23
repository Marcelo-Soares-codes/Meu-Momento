import { Express } from "express-serve-static-core";
import {
  create,
  login,
  getAll,
  getId,
  deleteId,
} from "../controllers/arena.controller";

const arenaRoutes = (app: Express) => {
  app.post("/arena/create", create);
  app.post("/arena/login", login);

  app.get("/arenas", getAll);
  app.get("/arena/:id", getId);

  app.delete("/arena/delete/:id", deleteId);
};

export default arenaRoutes;
