import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

import "./database";

import { routes } from "./routes";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (req, res) => {
  return res.render("html/client.html")
})

const http = createServer(app); // cria protocolo http
const io = new Server(http); // cria protocolo ws

io.on("connection", (socket: Socket) => {
  console.log("Se conectou", socket.id);
})

app.use(express.json());

app.use(routes);

// app.get("/", (req, res) => {
//   return res.json({
//     message: "Olá"
//   })
// })

// app.post("/users", (req, res) => {
//   return res.json({
//     message: "Usuário salvo com sucesso"
//   })
// })

const PORT = 3000;

http.listen(PORT, () => console.log(`Server is running on port ${PORT}`));