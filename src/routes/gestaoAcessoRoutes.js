var express = require("express");
var router = express.Router();

var gestaoAcessoController = require("../controllers/gestaoAcessoController");

// router.get("/alertas-hoje", function (req, res) {
//   gestaoAcessoController.buscarAlertasHoje(req, res);
// });

// router.get("/atmsoff", function (req, res) {
//   gestaoAcessoController.buscarATMSoff(req, res);
// });

// router.get("/atmscriticos", function (req, res) {
//   gestaoAcessoController.buscarATMScriticos(req, res);
// });

router.get("/loginsucesso", function (req, res) {
  gestaoAcessoController.carregarLoginSucesso(req,res);
});

router.get("/loginfalho", function (req, res) {
  gestaoAcessoController.carregarLoginFalho(req,res);
});

router.get("/loginsPorHora", function (req, res) {
  gestaoAcessoController.loginsPorHora(req,res);
});

router.get("/empresasemplano", function (req, res) {
  gestaoAcessoController.empresaSemPlano(req,res);
});

module.exports = router;