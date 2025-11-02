var gestaoModel = require("../models/gestaoModel")

function cadastrarFuncionario(req, res) {
	var nome = req.body.nome;
    var email = req.body.email;
    var empresa = req.body.empresa;
    var cpf = req.body.cpf;
	var permissionamento = req.body.permissionamento;

	gestaoModel.cadastrarFuncionario(nome, email, empresa, cpf, permissionamento).then((resultado) => {
		res.status(201).json(resultado);
	});
}

function validarFuncionario(req, res) {
    var email = req.body.email;
    var cpf = req.body.cpf;

	gestaoModel.validarFuncionario(email, cpf).then((resultado) => {
		res.status(201).json(resultado);
	});
}

function exibirFuncionarios(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    var idLogado = req.params.idUsuario;
    gestaoModel.exibirFuncionarios(fkEmpresa, idLogado).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function exibirFuncionariosPorBusca(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    var nome = req.params.nome;

    gestaoModel.exibirFuncionariosPorBusca(fkEmpresa, nome).then((resultado) => {
        res.status(201).json(resultado);
    });
}

function promoverFuncionario(req, res) {
	var idFuncionario = req.body.idUsuario

	gestaoModel.promoverFuncionario(idFuncionario).then((resultado) => {
		res.status(201).json(resultado);
	});
}

function removerFuncionario(req, res) {
	var idFuncionario = req.body.idUsuario

	gestaoModel.removerFuncionario(idFuncionario).then((resultado) => {
		res.status(201).json(resultado);
	});
}

module.exports = {
  cadastrarFuncionario,
  validarFuncionario,
  exibirFuncionarios,
  exibirFuncionariosPorBusca,
  promoverFuncionario,
  removerFuncionario,
};