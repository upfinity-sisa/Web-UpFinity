var express = require("express");
var router = express.Router();

var gestaoATMController = require("../controllers/gestaoATMController");

router.post("/cadastrarATM", function (req, res) {
  gestaoATMController.cadastrarATM(req, res);
});

module.exports = router;