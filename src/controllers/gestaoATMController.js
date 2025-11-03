var gestaoATMModel = require("../models/gestaoATMModel")

function cadastrarATM(req, res) {
    var fkEmpresa = req.body.fkEmpresa;
    var IP = req.body.IP;

    gestaoATMModel.cadastrarATM(fkEmpresa, IP).then((resultado) => {
        res.status(201).json(resultado);
    });
}

module.exports = {
  cadastrarATM,
};