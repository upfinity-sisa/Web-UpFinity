var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.post("/cadastrarEmpresa", function (req, res) {
  empresaController.cadastrarEmpresa(req, res);
});

module.exports = router;
