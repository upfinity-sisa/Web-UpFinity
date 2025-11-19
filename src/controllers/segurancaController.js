var segurancaModel = require("../models/segurancaModel")

function exibirKPIinvasoes(req, res) {
    var idAtm = req.params.idAtm;
    segurancaModel.exibirKPIinvasoes(idAtm).then((resultado) => {
        res.status(201).json(resultado);
    });
}

module.exports = {
  exibirKPIinvasoes,
};