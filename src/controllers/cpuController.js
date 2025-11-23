var cpuModel = require('../models/cpuModel');

function getDados(req, res) {
    const idAtm = req.params.idAtm;

    cpuModel
        .getDados(idAtm)
        .then(response => {
            if (response.length > 0) {
                res.status(200).json(response);
            } else {
                res.status(200).json([]);
            }
        })
        .catch(erro => {
            console.log(erro);
            console.log('Houve um erro ao buscar os dados de cpu: ', erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function getAlertas(req, res) {
    const idAtm = req.params.idAtm;

    cpuModel
        .getAlertas(idAtm)
        .then(response => {
            if (response.length > 0) {
                res.status(200).json(response);
            } else {
                res.status(200).json([]);
            }
        })
        .catch(erro => {
            console.log(erro);
            console.log('Houve um erro ao buscar os dados de cpu: ', erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function getMaioresUsos(req, res) {
    const idEmpresa = req.params.idEmpresa;

    cpuModel
        .getMaioresUsos(idEmpresa)
        .then(response => {
            if (response.length > 0) {
                res.status(200).json(response);
            } else {
                res.status(200).json([]);
            }
        })
        .catch(erro => {
            console.log(erro);
            console.log('Houve um erro ao buscar os dados de cpu: ', erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function getAlertasHoje(req, res) {
    const idEmpresa = req.params.idEmpresa;
    const idAtm = req.params.idAtm;

    cpuModel
        .getAlertasHoje(idAtm, idEmpresa)
        .then(response => {
            if (response.length > 0) {
                res.status(200).json(response);
            } else {
                res.status(200).json([]);
            }
        })
        .catch(erro => {
            console.log(erro);
            console.log('Houve um erro ao buscar os dados de cpu: ', erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    getDados,
    getAlertas,
    getMaioresUsos,
    getAlertasHoje,
};
