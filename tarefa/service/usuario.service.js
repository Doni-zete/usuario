// Importa o modelo Usuario do arquivo "../model/usuario"
const Usuario = require("../model/usuario");

// Função para listar um usuário pelo ID
const listarById = (id) => {
  return Usuario.findById(id);
};

// Função para listar todos os usuários
const listarTodosUsuario = () => {
  return Usuario.find();
};

// Função para criar um novo usuário
const createUsuario = (usuario) => {
  return Usuario.create(usuario);
};

// Função para atualizar um usuário pelo ID
const updateUsuario = (id, usuario) => {
  return Usuario.findByIdAndUpdate(id, usuario, { returnDocument: "after" });
};

// Função para excluir um usuário pelo ID
const deleteUsuario = (id) => {
  return Usuario.findByIdAndRemove(id);
};

// Exporta as funções para serem utilizadas por outros módulos
module.exports = {
  listarById,
  listarTodosUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
