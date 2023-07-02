// importa o módulo express e cria um roteador chamado router
const router = require("express").Router();
// importa o módulo usuario.controller, que contém as funções de controle relacionadas aos usuários.
const usuario = require("../controller/usuario.controller")

router.get("/listar/:id", usuario.listar); //Define uma rota GET com o caminho "/listar/:id"
router.get("/listarTodos", usuario.listarTodosUsuarios); //: Define uma rota GET com o caminho "/listarTodos"
router.post("/create", usuario.createUsuarios); // Define uma rota POST com o caminho "/create"
router.put("/update/:id", usuario.updateUsuario); // Define uma rota PUT com o caminho "/update/:id".
router.delete("/delete/:id", usuario.deleteUsuario); //Define uma rota DELETE com o caminho "/delete/:id"

module.exports = router;
