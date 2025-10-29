var empresaModel = require("../models/empresaModel")

function cadastrarEmpresa(req, res) {

  var razaoSocial = req.body.razaoSocialServer;
  var nomeFantasia = req.body.nomeFantasiaServer;
  var cnpj = req.body.cnpjServer;

  console.log(nomeFantasia)
  empresaModel
    .cadastrarEmpresa(razaoSocial, nomeFantasia, cnpj)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro de empresa! Erro: ",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function vincularPlano(req, res) {

  var idEmpresa = req.body.idEmpresaServer;
  var idPlano = req.body.idPlanoServer;

  empresaModel
    .vincularPlano(idEmpresa, idPlano)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao vincular plano! Erro: ",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
    });
}


function verificarPlano(req, res) {

  var idEmpresa = req.params.fkEmpresa;

  empresaModel
    .verificarPlano(idEmpresa)
    .then(function (resultado) {
      if (resultado.length == 1) {
        console.log(resultado);
        res.json({
          fkPlano: resultado[0].fkPlano,
          statusPagamento: resultado[0].statusPagamento
        });
        console.log(resultado[0]);
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao verificar plano da empresa! Erro: ",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  cadastrarEmpresa,
  verificarPlano,
  vincularPlano
};