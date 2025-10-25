var express = require("express");
var router = express.Router();

var gestaoController = require("../controllers/gestaoController");

router.post("/cadastrarFuncionario", function (req, res) {
  gestaoController.cadastrarFuncionario(req, res);
});

router.post("/validarFuncionario", function (req, res) {
  gestaoController.validarFuncionario(req, res);
});

router.get("/exibirFuncionarios/:fkEmpresa", function (req, res) {
    gestaoController.exibirFuncionarios(req, res);
})

router.get("/exibirFuncionariosPorBusca/:fkEmpresa/:nome", function (req, res) {
    gestaoController.exibirFuncionariosPorBusca(req, res);
})

module.exports = router;