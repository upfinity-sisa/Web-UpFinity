var segurancaModel = require("../models/segurancaModel")

function exibirKPIinvasoes(req, res) {
    var idAtm = req.params.idAtm;
    var fkEmpresa = req.params.fkEmpresa;
    segurancaModel.exibirKPIinvasoes(idAtm, fkEmpresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function exibirPortasAbertas(req, res) {
    var idAtm = req.params.idAtm;
    var fkEmpresa = req.params.fkEmpresa;
    segurancaModel.exibirPortasAbertas(idAtm, fkEmpresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function exibirKPIconexoesSUS(req, res) {
    var idAtm = req.params.idAtm;
    var fkEmpresa = req.params.fkEmpresa;
    segurancaModel.exibirKPIconexoesSUS(idAtm, fkEmpresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function exibirAlertas(req, res) {
    var idAtm = req.params.idAtm;
    var fkEmpresa = req.params.fkEmpresa;
    segurancaModel.exibirAlertas(idAtm, fkEmpresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function exibirArquivosCriticos(req, res) {
    var idAtm = req.params.idAtm;
    var fkEmpresa = req.params.fkEmpresa;
    segurancaModel.exibirArquivosCriticos(idAtm, fkEmpresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function exibirGrafico(req, res) {
    var idAtm = req.params.idAtm;
    var fkEmpresa = req.params.fkEmpresa;
    segurancaModel.exibirGrafico(idAtm, fkEmpresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

module.exports = {
  exibirKPIinvasoes,
  exibirPortasAbertas,
  exibirKPIconexoesSUS,
  exibirAlertas,
  exibirArquivosCriticos,
  exibirGrafico,
};