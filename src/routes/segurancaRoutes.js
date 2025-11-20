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

router.get("/exibirGrafico/:idAtm/:fkEmpresa", function (req, res) {
    segurancaController.exibirGrafico(req, res);
})

router.post("/salvarArquivoSalvo", function (req, res) {
  segurancaController.salvarArquivoSalvo(req, res);
});

router.get("/selecionarSeguranca/:idAtm/:fkEmpresa", function (req, res) {
    segurancaController.selecionarSeguranca(req, res);
})

module.exports = router;