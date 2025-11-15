var gestaoATMModel = require("../models/gestaoATMModel")

function cadastrarATM(req, res) {
    var fkEmpresa = req.body.fkEmpresa;
    var IP = req.body.IP;

    gestaoATMModel.cadastrarATM(fkEmpresa, IP).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function validarCadastroATM(req, res) {
    var idEmpresa = req.body.idEmpresa;

    gestaoATMModel.validarCadastroATM(idEmpresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

module.exports = {
  cadastrarATM,
  validarCadastroATM,
};