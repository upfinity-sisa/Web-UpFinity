var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

router.get("/ObterKPI_1/:idEmpresa", function (req, res) {
  alertasController.ObterKPI_1(req, res);
})

router.get("/ObterKPI_1_qtdCritico/:idEmpresa", function (req, res) {
  alertasController.ObterKPI_1_qtdCritico(req, res);
})
router.get("/ObterKPI_1_qtdModerado/:idEmpresa", function (req, res) {
  alertasController.ObterKPI_1_qtdModerado(req, res);
})

router.get("/ObterKPI_2/:idEmpresa", function (req, res) {
  alertasController.ObterKPI_2(req, res);
})

router.get("/ObterKPI_2_qtdCritico/:idEmpresa", function (req, res) {
  alertasController.ObterKPI_2_qtdCritico(req, res);
})
router.get("/ObterKPI_2_qtdModerado/:idEmpresa", function (req, res) {
  alertasController.ObterKPI_2_qtdModerado(req, res);
})

router.get("/ObterKPI_3/:idEmpresa", function (req, res) {
  alertasController.ObterKPI_3(req, res);
})

router.get("/ObterKPI_3_qtdCritico/:idEmpresa", function (req, res) {
  alertasController.ObterKPI_3_qtdCritico(req, res);
})
router.get("/ObterKPI_3_qtdModerado/:idEmpresa", function (req, res) {
  alertasController.ObterKPI_3_qtdModerado(req, res);
})


router.get("/Grafico_Bar/:idEmpresa", function (req, res) {
  alertasController.Grafico_Bar(req, res);
})

router.get("/ObterHistorico/:idEmpresa", function (req, res) {
  alertasController.ObterHistorico(req, res);
})

router.get("/ObterHistoricoATM/:idEmpresa", function (req, res) {
  alertasController.ObterHistoricoATM(req, res);
})

router.put("/mudarStatus/:idAlerta", function (req, res) {
  alertasController.mudarStatus(req, res);
})

router.get("/obterDadosBoxplot/:idEmpresa", function (req, res) {
  alertasController.obterDadosBoxplot(req, res);
})

module.exports = router;