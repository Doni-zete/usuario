const mongoose = require("mongoose");

// Cria um novo esquema de modelo para o usuário
const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  token: { type: String },
});

// Cria um modelo chamado Usuario com base no esquema UsuarioSchema. 
// O modelo é vinculado à coleção "usuarios" no banco de dados
const Usuario = mongoose.model("usuarios", UsuarioSchema);

// Exporta o modelo Usuario para que possa ser utilizado em outros arquivos.
module.exports = Usuario;
