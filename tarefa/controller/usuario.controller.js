const usuarioService = require("../service/usuario.service"); // Importa o módulo de serviço de usuário
const mongoose = require("mongoose"); // Importa o módulo mongoose para interagir com o MongoDB

const listar = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id); // Converte o ID da solicitação para um ObjectId do mongoose
    let found = false; // Variável para verificar se o usuário foi encontrado

    const usuario = await usuarioService.listarById(id); // Chama o serviço de usuário para listar um usuário pelo ID

    if (usuario != null) {
      found = true; // Se o usuário for encontrado, define a variável "found" como verdadeira
    }


    // Retorna uma resposta de erro se o usuário não for encontrado
    if (!found) {
      return res
        .status(404)
        .send({ message: "Usuario não foi encontrado, tente outro ID!" }); 
    }

    return res.status(200).send(usuario); // Retorna o usuário encontrado

  } catch (err) {
    console.log(`erro: ${err}`); // Exibe o erro no console
    return res.status(500).send("Erro no servidor, tente novamente mais tarde"); // Retorna uma resposta de erro do servidor
  }
};

const listarTodosUsuarios = async (req, res) => {
  return res.status(200).send(await usuarioService.listarTodosUsuario()); // Lista todos os usuários existentes
};

const createUsuarios = async (req, res) => {
  const usuario = req.body; // Obtém os dados do usuário a partir do corpo da solicitação

  if (Object.keys(usuario).length === 0) {
    return res.status(400).send({ message: "Nada encontrado, está vazio!" }); // Retorna uma resposta de erro se não houver dados de usuário
  }

  if (!usuario.nome) {
    return res.status(400).send({ message: "O campo nome não foi encontrado" }); // Retorna uma resposta de erro se o campo "nome" estiver ausente
  }

  if (!usuario.email) {
    return res
      .status(400)
      .send({ message: "O campo email não foi encontrado" }); // Retorna uma resposta de erro se o campo "email" estiver ausente
  }

  if (!usuario.senha) {
    return res
      .status(400)
      .send({ message: "O campo senha não foi encontrado" }); // Retorna uma resposta de erro se o campo "senha" estiver ausente
  }

  if (!usuario.token) {
    usuario.token = ""; // Define o valor do token como vazio se não estiver presente
  }

  try {
    const novoUsuario = await usuarioService.createUsuario(usuario); // Cria um novo usuário com os dados fornecidos
    return res.status(201).send(novoUsuario);
  } catch (error) {
    console.error(error); // Imprime o erro no console para fins de depuração
    return res.status(500).send({ message: "Erro ao criar o usuário" });
  }
};


const updateUsuario = async (req, res) => {
  const id = req.params.id; // Obtém o ID do usuário a partir dos parâmetros da solicitação
  const usuario = req.body; // Obtém os dados do usuário a partir do corpo da solicitação

  // Retorna uma resposta de erro se não houver dados de usuário
  if (Object.keys(usuario).length === 0) {
    return res.status(400).send({ message: "Nada encontrado, está vazio!" }); 
  }

   // Retorna uma resposta de erro se o campo "nome" estiver ausente
  if (!usuario.nome) {
    return res.status(400).send({ message: "O campo nome não foi encontrado" });
  }

  // Retorna uma resposta de erro se o campo "email" estiver ausente
  if (!usuario.email) {
    return res
      .status(400)
      .send({ message: "O campo email não foi encontrado" }); 
  }

  // Retorna uma resposta de erro se o campo "senha" estiver ausente
  if (!usuario.senha) {
    return res
      .status(400)
      .send({ message: "O campo senha não foi encontrado" }); 
  }

  // Atualiza o usuário com os dados fornecidos
  return res.status(200).send(await usuarioService.updateUsuario(id, usuario)); 
};

const deleteUsuario = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id); // Converte o ID da solicitação para um ObjectId do mongoose
    let found = false; // Variável para verificar se o usuário foi encontrado

    const usuario = await usuarioService.listarById(id); // Chama o serviço de usuário para listar um usuário pelo ID

    if (usuario != null) {
      found = true; // Se o usuário for encontrado, define a variável "found" como verdadeira
      return res.status(200).send(await usuarioService.deleteUsuario(id)); // Deleta o usuário encontrado
    }

    if (!found) {
      return res
        .status(404)
        .send({ message: "Usuario não foi encontrado, tente outro ID!" }); // Retorna uma resposta de erro se o usuário não for encontrado
    }
  } catch (err) {
    console.log(`erro: ${err}`); // Exibe o erro no console
    return res.status(500).send("Erro no servidor, tente novamente mais tarde"); // Retorna uma resposta de erro do servidor
  }
};

// exportando um objeto contendo várias funções 
module.exports = {
  listar,
  listarTodosUsuarios,
  createUsuarios,
  updateUsuario,
  deleteUsuario,
};
