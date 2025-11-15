var express = require("express");
var router = express.Router();

var gestaoATMController = require("../controllers/gestaoATMController");

router.post("/cadastrarATM", function (req, res) {
  gestaoATMController.cadastrarATM(req, res);
});

router.post("/validarCadastroATM", function (req, res) {
  gestaoATMController.validarCadastroATM(req, res);
});

router.post("/atualizarParametro", function (req, res) {
  gestaoATMController.atualizarParametro(req, res);
});

module.exports = router;