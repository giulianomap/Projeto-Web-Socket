import express from "express";

import "./database";

import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.get("/", (req, res) => {
  return res.json({
    message: "Olá"
  })
})

app.post("/users", (req, res) => {
  return res.json({
    message: "Usuário salvo com sucesso"
  })
})

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));