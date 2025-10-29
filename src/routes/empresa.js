var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/cadastrarEmpresa", function (req, res) {
  empresaController.cadastrarEmpresa(req, res);
});

router.get("/verificarPlano/:fkEmpresa", function (req, res) {
  empresaController.verificarPlano(req, res);
});

router.put("/vincularPlano", function (req, res) {
  empresaController.vincularPlano(req, res);
});

module.exports = router;
