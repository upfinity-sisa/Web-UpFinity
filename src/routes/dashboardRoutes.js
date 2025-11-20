var express = require('express');
var router = express.Router();

var dashboardController = require('../controllers/dashboardController');

router.get('/ultimas-capturas/:idAtm', (req, res) => {
    dashboardController.ultimasCapturas(req, res);
});

router.get('/ultimas-capturas-rede/:idAtm', (req, res) => {
    dashboardController.ultimasCapturasRede(req, res);
});

router.get('/pegar-parametros/:idEmpresa', (req, res) => {
    dashboardController.pegarParametros(req, res);
});

router.get('/pegar-downtime/:idAtm', (req, res) => {
    dashboardController.pegarDowntime(req, res);
});

router.get('/ultimos-horarios/:idAtm', (req, res) => {
    dashboardController.pegarUltimosHorariosCaptura(req, res);
});

router.get('/carregar-alertas/:idAtm', (req, res) => {
    dashboardController.carregarAlertas(req, res);
});

router.get('/carregar-atms/:idEmpresa', (req, res) => {
    dashboardController.carregarAtms(req, res);
});

module.exports = router;
