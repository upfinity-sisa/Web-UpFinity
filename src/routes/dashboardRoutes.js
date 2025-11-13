var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

// router.get('/capturas-tempoReal/:idAtm', (req, res) => {
//   dashboardController.capturasTempoReal(req, res)
// })

router.get('/ultimas-capturas/:idAtm', (req, res) => {
  dashboardController.ultimasCapturas(req, res)
})

module.exports = router;