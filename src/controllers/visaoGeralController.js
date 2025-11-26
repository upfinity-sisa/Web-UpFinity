var visaoGeralModel = require('../models/visaoGeralModel.js');

function getAtms(req, res) {
    const idEmpresa = req.params.idEmpresa;

    visaoGeralModel
        .getAtms(idEmpresa)
        .then(response => {
            if (response.length > 0) {
                res.status(200).json(response);
            } else {
                res.status(200).json([]);
            }
        })
        .catch(erro => {
            console.log(erro);
            console.log('Houve um erro ao buscar os dados dos ATMS: ', erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


function BuscarATM(req, res) {
    const idEmpresa = req.params.idEmpresa;
    const numeracao = req.params.numeracao;

    visaoGeralModel
        .BuscarATM(idEmpresa, numeracao)
        .then(response => {
            if (response.length > 0) {
                res.status(200).json(response);
            } else {
                res.status(200).json([]);
            }
        })
        .catch(erro => {
            console.log(erro);
            console.log('Houve um erro ao buscar os dados dos ATMS: ', erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    getAtms,
    BuscarATM
};
