var express = require('express');
var router = express.Router();

var cpuController = require('../controllers/cpuController');

router.get('/dados/:idAtm', (req, res) => {
    cpuController.getDados(req, res);
});

router.get('/alertas/:idAtm', (req, res) => {
    cpuController.getAlertas(req, res);
});
