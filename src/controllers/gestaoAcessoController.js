var gestaoAcessoModel = require("../models/gestaoAcessoModel")

// function buscarAlertasHoje(req, res) {
//     gestaoAcessoModel.buscarAlertasHoje()
//     .then((resultado) => {
//         res.status(200).json(resultado[0]);
//     })
//     .catch((e) => {
//         console.log("Erro ao buscar alertas de hoje:", e);
//         res.status(500).json({e: "Erro ao buscar alertas gerados hoje"});
//     });
// }

// function buscarATMSoff(req, res) {
//     gestaoAcessoModel.buscarATMSoff()
//     .then((resultado) => {
//         res.status(200).json(resultado[0]);
//     })
//     .catch((e) => {
//         console.log("Erro ao buscar alertas de hoje:", e);
//         res.status(500).json({e: "Erro ao buscar alertas gerados hoje"});
//     });
// }

// function buscarATMScriticos(req, res) {
//     gestaoAcessoModel.buscarATMScriticos()
//     .then((resultado) => {
//         res.status(200).json(resultado[0]);
//     })
//     .catch((e) => {
//         console.log("Erro ao buscar alertas de hoje:", e);
//         res.status(500).json({e: "Erro ao buscar alertas gerados hoje"});
//     });
// }

function carregarLoginSucesso(req, res) {
    gestaoAcessoModel.carregarLoginSucesso()
    .then((resultado) => {
        res.status(200).json(resultado[0]);
    })
    .catch((e) => {
        console.log("Erro ao buscar alertas de hoje:", e);
        res.status(500).json({e: "Erro ao buscar logins"});
    });
}

function carregarLoginFalho(req, res) {
    gestaoAcessoModel.carregarLoginFalho()
    .then((resultado) => {
        res.status(200).json(resultado[0]);
    })
    .catch((e) => {
        console.log("Erro ao buscar alertas de hoje:", e);
        res.status(500).json({e: "Erro ao buscar logins falhos"});
    });
}

function loginsPorHora(req, res) {
     gestaoAcessoModel.loginsPorHora()
    .then((resultado) => {
        res.status(200).json(resultado);
    })
    .catch((e) => {
        console.log("Erro ao buscar logins por hora:", e);
        res.status(500).json({e: "Erro ao buscar logins por hora"});
    });
}

function empresaSemPlano(req, res) {
     gestaoAcessoModel.empresaSemPlano()
    .then((resultado) => {
        res.status(200).json(resultado[0]);
    })
    .catch((e) => {
        console.log("Erro ao buscar logins por hora:", e);
        res.status(500).json({e: "Erro ao buscar empresas sem plano"});
    });
}

function novosUsuariosPorSemana(req, res) {
     gestaoAcessoModel.novosUsuariosPorSemana()
    .then((resultado) => {

        const linhas = resultado[0];
        res.status(200).json(Array.isArray(linhas) ? linhas : [linhas]);
    })
    .catch((e) => {
        console.log("Erro ao buscar novos usuarios por semana:", e);
        res.status(500).json({e: "Erro ao buscar novos usuarios por semana"});
    });
}



module.exports = {
//   buscarAlertasHoje,
//   buscarATMSoff,
//   buscarATMScriticos,
  carregarLoginSucesso,
  carregarLoginFalho,
  loginsPorHora,
  empresaSemPlano,
  novosUsuariosPorSemana,
};