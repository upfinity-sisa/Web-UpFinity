var express = require("express");
var router = express.Router();

var segurancaController = require("../controllers/segurancaController");

router.get("/exibirKPIinvasoes/:idAtm/:fkEmpresa", function (req, res) {
    segurancaController.exibirKPIinvasoes(req, res);
})

router.get("/exibirPortasAbertas/:idAtm/:fkEmpresa", function (req, res) {
    segurancaController.exibirPortasAbertas(req, res);
})

router.get("/exibirKPIconexoesSUS/:idAtm/:fkEmpresa", function (req, res) {
    segurancaController.exibirKPIconexoesSUS(req, res);
})

router.get("/exibirAlertas/:idAtm/:fkEmpresa", function (req, res) {
    segurancaController.exibirAlertas(req, res);
})

router.get("/exibirArquivosCriticos/:idAtm/:fkEmpresa", function (req, res) {
    segurancaController.exibirArquivosCriticos(req, res);
})

module.exports = router;