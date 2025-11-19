var segurancaModel = require("../models/segurancaModel")

function exibirKPIinvasoes(req, res) {
    var idAtm = req.params.idAtm;
    segurancaModel.exibirKPIinvasoes(idAtm).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function exibirKPIarquivos(req, res) {
    var idAtm = req.params.idAtm;
    segurancaModel.exibirKPIarquivos(idAtm).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function exibirPortasAbertas(req, res) {
    var idAtm = req.params.idAtm;
    segurancaModel.exibirPortasAbertas(idAtm).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function exibirKPIconexoesSUS(req, res) {
    var idAtm = req.params.idAtm;
    segurancaModel.exibirKPIconexoesSUS(idAtm).then((resultado) => {
        res.status(201).json(resultado);
    });
}

module.exports = {
  exibirKPIinvasoes,
  exibirKPIarquivos,
  exibirPortasAbertas,
  exibirKPIconexoesSUS,
};