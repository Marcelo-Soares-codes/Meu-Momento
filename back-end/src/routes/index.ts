import { Express } from "express-serve-static-core";
import userRoutes from "./user.routes";
import arenaRoutes from "./arena.routes";

const routes = (app: Express) => {
  userRoutes(app);
  arenaRoutes(app);
};

export default routes;
