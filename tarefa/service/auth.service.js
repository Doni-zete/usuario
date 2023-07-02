const Usuario = require("../model/usuario");
// importa o módulo jsonwebtoken, que é usado para gerar tokens de autenticação
const jwt = require("jsonwebtoken");

// função realiza uma consulta no banco de dados para encontrar um usuário com o email especificado
const loginService = (email) => Usuario.findOne({ email });

// função atualiza o token de autenticação do usuário no banco de dados
const updateToken = (user) => {
  return Usuario.findByIdAndUpdate(user.id, user, { returnDocument: "after" });
};

// função gera um token de autenticação utilizando o jsonwebtoken
const generateToken = (userId, segredo) =>
  jwt.sign(userId, segredo, { expiresIn: 86400 });

module.exports = { loginService, updateToken, generateToken };
