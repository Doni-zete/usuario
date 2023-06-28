const express = require("express");
const app = express();
const request = require("request");

const usuario = require("./router/usuario.router")

const port = 3002;

app.use(express.json());

app.use("/usuario", usuario);

app.get("/", (req, res) => {
  const url = req.body.url;

  request(url, function (error, response, body) {
    console.log("StatusCode:", response && response.statusCode);

    const pokemon = JSON.parse(body);

    res.send(pokemon);

    console.log(`Numero: ${pokemon.id}`)
    console.log(`Nome: ${pokemon.name}`)
    console.log(`Altura: ${pokemon.height}`)
    console.log(`Largura: ${pokemon.weight}`)
    console.log("Tipos:", pokemon.types)

  });
});

app.listen(port, () => {
  console.log(`Rodando no http://localhost:${port}`);
});
