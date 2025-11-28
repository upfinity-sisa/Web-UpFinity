var medidaModel = require("../models/medidaModel");

function buscarMedidasEmTempoReal(req, res) {
    var idAtm = req.params.idAtm;

    console.log(`Recuperando medidas em tempo real para o ATM ${idAtm}`);

    medidaModel.buscarMedidasEmTempoReal(idAtm).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosGrafico(req, res) {
    const idAtm = req.params.idAtm;

    if (idAtm == undefined) {
        res.status(400).send("ID do ATM não foi fornecido!");
        return;
    }

    medidaModel.buscarDadosGrafico(idAtm).then(function (resultado) {
        if (resultado.length > 0) {
            resultado.reverse(); 
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum dado de rede encontrado para o gráfico!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados do gráfico de rede. Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscarMedidasEmTempoReal,
    buscarDadosGrafico
}