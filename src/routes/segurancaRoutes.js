var express = require("express");
var router = express.Router();

var segurancaController = require("../controllers/segurancaController");

router.get("/exibirKPIinvasoes/:idAtm", function (req, res) {
    segurancaController.exibirKPIinvasoes(req, res);
})

router.get("/exibirKPIarquivos/:idAtm", function (req, res) {
    segurancaController.exibirKPIarquivos(req, res);
})

router.get("/exibirPortasAbertas/:idAtm", function (req, res) {
    segurancaController.exibirPortasAbertas(req, res);
})

router.get("/exibirKPIconexoesSUS/:idAtm", function (req, res) {
    segurancaController.exibirKPIconexoesSUS(req, res);
})

module.exports = router;