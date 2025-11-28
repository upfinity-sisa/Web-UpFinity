var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

// Rota para pegar os dados mais recentes (KPIs)
router.get("/tempo-real/:idAtm", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

router.get("/historico/:idAtm", function (req, res) {
    medidaController.buscarDadosGrafico(req, res);
});

module.exports = router;