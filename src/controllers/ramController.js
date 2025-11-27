var ramModel = require('../models/ramModel');

function ObterKPI_1(req, res) {
    let idEmpresa = req.params.idEmpresa;

    ramModel.ObterKPI_1(idEmpresa)
        .then((resultado) => {
            console.log("resultado da controller:", resultado);
            res.json({
                usoMedio: resultado[0].usoMedio
            })
        }).catch((erro) => {
            console.log(erro);
            console.log("Erro ao mudar status do alerta:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function ObterKPI_2(req, res) {
    let idEmpresa = req.params.idEmpresa;

    ramModel.ObterKPI_2(idEmpresa)
        .then((resultado) => {
            console.log("resultado da controller:", resultado);
            res.json({
                qtdAlerta: resultado[0].qtdAlerta
            })
        }).catch((erro) => {
            console.log(erro);
            console.log("Erro ao mudar status do alerta:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function ObterKPI_3(req, res) {
    let idEmpresa = req.params.idEmpresa;
    console.log("CHEGEUI AQUI MANO=========================================")
    ramModel.ObterKPI_3(idEmpresa)
        .then((resultado) => {
            console.log("resultado da controller:", resultado);
            res.json({
                qtdHorario: resultado[0].hora_do_dia?resultado[0].hora_do_dia:null
            })
        }).catch((erro) => {
            console.log(erro);
            console.log("Erro ao mudar status do alerta:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function CarregarDadosGraficoUsoAtual(req, res) {
    let idEmpresa = req.params.idEmpresa;

    ramModel.CarregarDadosGraficoUsoAtual(idEmpresa)
        .then((resultado) => {
            console.log("resultado da controller:", resultado);
            res.json({
                grafUsoAtual: resultado
            })
        }).catch((erro) => {
            console.log(erro);
            console.log("Erro ao mudar status do alerta:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function CarregarDadosGraficoDeUso(req, res) {
    let idEmpresa = req.params.idEmpresa;
grafUsoAtual
    ramModel.CarregarDadosGraficoDeUso(idEmpresa)
        .then((resultado) => {
            console.log("resultado da controller:", resultado);
            res.json({
                usoAtualRam: resultado[0].statusUso 
            })
        }).catch((erro) => {
            console.log(erro);
            console.log("Erro ao carregar dados do gráfico de uso atual:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    ObterKPI_1,
    ObterKPI_2,
    ObterKPI_3,
    CarregarDadosGraficoUsoAtual,
    CarregarDadosGraficoDeUso
};