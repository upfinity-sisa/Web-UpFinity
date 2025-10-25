var database = require("../database/config");

function cadastrarFuncionario(nome, email, empresa, cpf, permissionamento) {
    var instrucaoSql = `
    insert into Usuario (fkTipoUsuario, fkEmpresa, nome, CPF, email, senha) values
        (${permissionamento}, ${empresa}, "${nome}", "${cpf}", "${email}", "${cpf}");
    `

    return database.executar(instrucaoSql);
}

function validarFuncionario(email, cpf) {
    var instrucaoSql = `
    select idUsuario from Usuario where email = '${email}' or CPF = '${cpf}';
    `

    return database.executar(instrucaoSql);
}

module.exports = {
  cadastrarFuncionario,
  validarFuncionario,
};