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

module.exports = {
  cadastrarEmpresa,
};