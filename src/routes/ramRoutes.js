var express = require("express");
var router = express.Router();
var ramController = require("../controllers/ramController");

router.get("/ObterKPI_1/:idEmpresa", function (req, res) {
  ramController.ObterKPI_1(req, res);
})

router.get("/ObterKPI_2/:idEmpresa", function (req, res) {
  ramController.ObterKPI_2(req, res);
})

router.get("/ObterKPI_3/:idEmpresa", function (req, res) {
  ramController.ObterKPI_3(req, res);
})


module.exports = router;