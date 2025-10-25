var database = require("../database/config");

function cadastrarEmpresa(razaoSocial, nomeFantasia, cnpj) {
  console.log(
    "ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    razaoSocial,
    nomeFantasia,
    cnpj,
  );

  cnpj = cnpj.replaceAll(".", "");
  cnpj = cnpj.replaceAll("/", "");
  cnpj = cnpj.replaceAll("-", "");

  if (nomeFantasia == undefined) {
    nomeFantasia = null
  }
  var instrucaoSql = `
        INSERT INTO Empresa (razaoSocial, nomeFantasia, cnpj) VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function verificarPlano(idEmpresa) {
  console.log(
    "ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    idEmpresa
  );

  var instrucaoSql = `
      SELECT fkPlano, statusPagamento FROM Empresa WHERE idEmpresa = ${idEmpresa} LIMIT 1;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrarEmpresa,
  verificarPlano
};