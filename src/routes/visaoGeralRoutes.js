var express = require('express');
var router = express.Router();

var visaoGeralController = require('../controllers/visaoGeralController');

router.get('/getAtms/:idEmpresa', (req, res) => {
    visaoGeralController.getAtms(req, res);
});

router.get('/BuscarATM/:idEmpresa/:numeracao', (req, res) => {
    visaoGeralController.BuscarATM(req, res);
});

module.exports = router;
