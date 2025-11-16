var gestaoAcessoModel = require("../models/gestaoAcessoModel")

function buscarAlertasHoje(req, res) {
    gestaoAcessoModel.buscarAlertasHoje()
    .then((resultado) => {
        res.status(200).json(resultado[0]);
    })
    .catch((e) => {
        console.log("Erro ao buscar alertas de hoje:", e);
        res.status(500).json({e: "Erro ao buscar alertas gerados hoje"});
    });
}

function buscarATMSoff(req, res) {
    gestaoAcessoModel.buscarATMSoff()
    .then((resultado) => {
        res.status(200).json(resultado[0]);
    })
    .catch((e) => {
        console.log("Erro ao buscar alertas de hoje:", e);
        res.status(500).json({e: "Erro ao buscar alertas gerados hoje"});
    });
}

function buscarATMScriticos(req, res) {
    gestaoAcessoModel.buscarATMScriticos()
    .then((resultado) => {
        res.status(200).json(resultado[0]);
    })
    .catch((e) => {
        console.log("Erro ao buscar alertas de hoje:", e);
        res.status(500).json({e: "Erro ao buscar alertas gerados hoje"});
    });
}



module.exports = {
  buscarAlertasHoje,
  buscarATMSoff,
  buscarATMScriticos
};