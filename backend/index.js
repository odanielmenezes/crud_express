const cors = require("cors");
const usuarios = require("./src/data/db.json");
const express = require("express");
const server = express();
const port = process.env.PORT || 3000;

server.use(
//FIX CORS, ADD YOUR URL LOCAL HERE
  cors({
    origin: "http://127.0.0.1:5500"   
  }),
  express.json()
);

server.get("/users", (req, res) => {
  return res.send(usuarios.users);
});

server.get("/users/:id", (req, res) => {
  const user = usuarios.users.find((e) => e.id === parseInt(req.params.id));
  console.log(req.params.id);
  if (!user)
    return res.status(404).send("O usuário informado não foi encontrado");

  res.send(user);
});

server.put("/put/:id", (req, res) => {
  const user = usuarios.users.find((e) => e.id === req.params.id)
  const { nome, sobrenome } = req.body
  console.log(req.body);
  if(!user)
  return res.status(404).send(`Usuário de id "${req.params.id}" não encontrado!`)

  user.nome = nome
  user.sobrenome = sobrenome
  res.send(user);
})

server.post("/users", (req, res) => {
  console.log('BODY', req.body)
  const user = {
    id: usuarios.users.length === 0 ? "1" : parseInt(parseInt(usuarios.users[usuarios.users.length - 1].id) + 1).toString(),
    nome: req.body.nome,
    sobrenome: req.body.sobrenome
  };
  usuarios.users.push(user);
  console.log('AAAAAA', usuarios.users)
  res.send(user);
});

server.delete("/delete/:id", (req, res) => {
  const user = usuarios.users.find((e) => e.id === req.params.id)
  if (!user)
  return res.status(400).send(`Usuário de id ${req.params.id} não encontrado!`)

  const index = usuarios.users.indexOf(user);
  usuarios.users.splice(index, 1);

  res.send(user)
})

server.listen(port, () => {
  console.log(`Servidor started on port ${port}`);
});
