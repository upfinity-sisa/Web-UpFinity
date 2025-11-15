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

function atualizarParametro(req, res) {
    var fkEmpresa = req.body.fkEmpresa;
    var fkTipoComponente = req.body.fkTipoComponente;
    var fkTipoAlerta = req.body.fkTipoAlerta;
    var limiteMAX = req.body.limiteMAX;

    gestaoATMModel.atualizarParametro(fkEmpresa, fkTipoComponente, fkTipoAlerta, limiteMAX).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function exibirATMs(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    gestaoATMModel.exibirATMs(fkEmpresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function removerComponentes(req, res) {
    var fkEmpresa = req.body.fkEmpresa;
    var numeracao = req.body.numeracao;

    gestaoATMModel.removerComponentes(fkEmpresa, numeracao).then((resultado) => {
        gestaoATMModel.removerATM(fkEmpresa, numeracao).then((resultado2) => {
            res.status(201).json(resultado2);
        });
	});

}

//removerComponentes

module.exports = {
  cadastrarATM,
  validarCadastroATM,
  atualizarParametro,
  exibirATMs,
  removerComponentes,
};