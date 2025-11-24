var express = require("express");
var router = express.Router();
var ramController = require("../controllers/ramController");

// Rota para buscar todos os dados (KPIs e Gráfico) de uma vez
router.get("/dados-ram/:idAtm", ramController.buscarDadosRam);

// Rota para buscar o total de RAM
router.get("/ram-total/:idAtm", ramController.buscarRamTotal);

module.exports = router;