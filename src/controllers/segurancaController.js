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

function salvarArquivoSalvo(req, res) {
    var idAtm = req.body.idAtm;
    var fkEmpresa = req.body.fkEmpresa;
    var conteudo01 = req.body.conteudo01;

    segurancaModel.salvarArquivoSalvo(idAtm, fkEmpresa, conteudo01).then((resultado) => {
        segurancaModel.atualizarUltimaCapturaArquivo(idAtm, fkEmpresa, conteudo01).then((resultado2) => {
            res.status(201).json(resultado2);
        });
    });
}

function selecionarSeguranca(req, res) {
    var idAtm = req.params.idAtm;
    var fkEmpresa = req.params.fkEmpresa;
    segurancaModel.selecionarSeguranca(idAtm, fkEmpresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function salvarConexaoSalva(req, res) {
    var idAtm = req.body.idAtm;
    var fkEmpresa = req.body.fkEmpresa;
    var conteudo01 = req.body.conteudo01;
    var conteudo02 = req.body.conteudo02;

    segurancaModel.salvarConexaoSalva(idAtm, fkEmpresa, conteudo01, conteudo02).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function buscarAtms(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    segurancaModel.buscarAtms(fkEmpresa).then((resultado) => {
        res.status(201).json(resultado);
    });
}

module.exports = {
  exibirKPIinvasoes,
  exibirPortasAbertas,
  exibirAlertas,
  exibirArquivosCriticos,
  exibirGrafico,
  salvarArquivoSalvo,
  selecionarSeguranca,
  salvarConexaoSalva,
  buscarAtms,
};