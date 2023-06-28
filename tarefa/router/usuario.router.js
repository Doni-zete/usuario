const router = require("express").Router();
const usuario = require("../controller/usuario.controller")

router.get("/listar/:id", usuario.listar);
router.get("/listarTodos", usuario.listarTodosUsuarios);
router.post("/create", usuario.createUsuarios);

router.put("/update/:id", usuario.updateUsuario);
router.delete("/delete/:id", usuario.deleteUsuario);




module.exports = router;
