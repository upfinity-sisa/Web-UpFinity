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

module.exports = {
    buscarMedidasEmTempoReal
}