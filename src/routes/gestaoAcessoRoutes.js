var express = require("express");
var router = express.Router();

var gestaoAcessoController = require("../controllers/gestaoAcessoController");

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

router.get("/novosUsuariosPorSemana" , function (req, res) {
  gestaoAcessoController.novosUsuariosPorSemana(req,res);
});

module.exports = router;