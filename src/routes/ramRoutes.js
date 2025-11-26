var express = require("express");
var router = express.Router();
var ramController = require("../controllers/ramController");


router.get("/buscarDadosRam/:idEmpresa", function (req, res) {
  ramController.buscarDadosRam(req, res);
})

router.get("/buscarRamTotal/:idEmpresa", function (req, res) {
  ramController.buscarRamTotal(req, res);
})

router.get("/CarregarDadosGraficoUsoAtual/:idEmpresa", function (req, res) {
  ramController.CarregarDadosGraficoUsoAtual(req, res);
})

module.exports = router;