import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

app.listen(process.env.PORT);
console.log(
  `Servidor rodando em http://www.${process.env.HOST}:${process.env.PORT}`
);
