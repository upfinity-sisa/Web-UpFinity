var express = require("express");
var router = express.Router();

var segurancaController = require("../controllers/segurancaController");

router.get("/exibirKPIinvasoes/:idAtm", function (req, res) {
    segurancaController.exibirKPIinvasoes(req, res);
})

module.exports = router;