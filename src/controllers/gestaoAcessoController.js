var gestaoAcessoModel = require("../models/gestaoAcessoModel")

function carregarLoginSucesso(req, res) {
    const dia = req.query.dia;

    gestaoAcessoModel.carregarLoginSucesso(dia)
    .then((resultado) => {
        res.status(200).json(resultado[0]);
    })
    .catch((e) => {
        console.log("Erro ao buscar alertas de hoje:", e);
        res.status(500).json({e: "Erro ao buscar logins"});
    });
}

function carregarLoginFalho(req, res) {
    const dia = req.query.dia;

    gestaoAcessoModel.carregarLoginFalho(dia)
    .then((resultado) => {
        res.status(200).json(resultado[0]);
    })
    .catch((e) => {
        console.log("Erro ao buscar alertas de hoje:", e);
        res.status(500).json({e: "Erro ao buscar logins falhos"});
    });
}

function loginsPorHora(req, res) {
    const dia = req.query.dia;

     gestaoAcessoModel.loginsPorHora(dia)
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

        const linhas = resultado;
        
        res.status(200).json(linhas); 
        
    })
    .catch((e) => {
        console.log("Erro ao buscar novos usuarios por semana:", e);
        res.status(500).json({e: "Erro ao buscar novos usuarios por semana"});
    });
}



module.exports = {
  carregarLoginSucesso,
  carregarLoginFalho,
  loginsPorHora,
  empresaSemPlano,
  novosUsuariosPorSemana,
};