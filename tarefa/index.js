// Importação dos módulos e arquivos necessários
const express = require("express");
const mongoose = require("mongoose");
const connecToDatabase = require("./database/database");
const authService = require("./service/auth.service");
const app = express();
const usuario = require("./router/usuario.router");
const jwt = require("jsonwebtoken");

// Conexão com o banco de dados
connecToDatabase();

// porta e segredo
const port = 3002;
const segredo = "2rugq3zryo7wzziicxa9d";

//  tratar requisições JSON
app.use(express.json());

// Rotas para a entidade "usuario"
app.use("/usuario", usuario);

// Rota principal
app.get("/", (req, res) => {
  console.log(token());
  res.send("hello");
});

// Rota de login
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await authService.loginService(email);
    const token = authService.generateToken({ user }, segredo);

    if (!user) {
      return res
        .status(400)
        .send({ message: "Usuario não encontrado, tente novamente" });
    }

    if (senha != user.senha) {
      return res.status(400).send({ message: "Senha invalida!" });
    }
    user.token = token;
    await authService.updateToken(user);
    console.log(user);

    res.status(200).send({ user, token });
  } catch (err) {
    console.log(`erro: ${err}`);
  }
});

// Rota de teste de token
app.get("/teste-token", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: `O token não foi informado!` });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return res.status(401).send({ message: `Token invalido!` });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: `Token mal formatado!` });
  }

  jwt.verify(token, segredo, (err, decoded) => {
    if (err) {
      console.log(`erro: ${err}`);
      return res.status(500).send({ message: `Erro interno, tente novamente` });
    }
    console.log(decoded);
    res.send(decoded);
  });
});

// Rota para validar o token
app.post("/validar", async (req, res) => {
  const { email, token } = req.body;

  const user = await authService.loginService(email);

  if (!user) {
    return res
      .status(400)
      .send({ message: "Usuario não encontrado, tente novamente" });
  }

  if (token != user.token) {
    return res
      .status(400)
      .send({ message: "token incorreto ou expirado, tente novamente" });
  }

  user.token = "";
  await authService.updateToken(user);
  res.status(200).send(user);
});

// Função para gerar um token aleatório
const token = function () {
  let token = Math.random().toString(36).substring(2);
  return token;
};

// Inicia o servidor
app.listen(port, () => {
  console.log(`Rodando no http://localhost:${port}`);
});
