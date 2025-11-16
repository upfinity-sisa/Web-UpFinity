var express = require("express");
var router = express.Router();

var gestaoAcessoController = require("../controllers/gestaoAcessoController");

router.get("/alertas-hoje", function (req, res) {
  gestaoAcessoController.buscarAlertasHoje(req, res);
});

router.get("/atmsoff", function (req, res) {
  gestaoAcessoController.buscarATMSoff(req, res);
});

router.get("/atmscriticos", function (req, res) {
  gestaoAcessoController.buscarATMScriticos(req, res);
});

module.exports = router;