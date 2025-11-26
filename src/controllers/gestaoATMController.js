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

function removerATM(req, res) {
    var fkEmpresa = req.body.fkEmpresa;
    var numeracao = req.body.numeracao;

    gestaoATMModel.removerAlertas(fkEmpresa, numeracao)
        .then((resultadoAlertas) => {
            return gestaoATMModel.removerCapturas(fkEmpresa, numeracao);
        })
        .then((resultadoCapturas) => {
            return gestaoATMModel.removerComponentes(fkEmpresa, numeracao);
        })
        .then((resultadoComponentes) => {
            return gestaoATMModel.removerATM(fkEmpresa, numeracao);
        })
        .then((resultadoFinal) => {
            res.status(201).json(resultadoFinal);
        })
        .catch((erro) => {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a exclusão! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizarEstado(req, res) {
    var fkEmpresa = req.body.fkEmpresa;
    var numeracao = req.body.numeracao;
    var statusEstado = req.body.statusEstado;

    gestaoATMModel.atualizarEstado(fkEmpresa, numeracao, statusEstado).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function atualizarATM(req, res) {
    var fkEmpresa = req.body.fkEmpresa;
    var numeracao = req.body.numeracao;
    var statusEstado = req.body.statusEstado;
    var IP = req.body.IP;

    gestaoATMModel.atualizarATM(fkEmpresa, numeracao, statusEstado, IP).then((resultado) => {
        res.status(201).json(resultado);
    });
}

module.exports = {
  cadastrarATM,
  validarCadastroATM,
  atualizarParametro,
  exibirATMs,
  removerATM,
  atualizarEstado,
  atualizarATM,
};