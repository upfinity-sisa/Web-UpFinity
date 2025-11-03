var database = require("../database/config");

function cadastrarATM(empresa, ip) {
    var instrucaoSql = `
    insert into Atm (fkEmpresa, numeracao, IP, statusEstado, statusMonitoramento) values
        (${empresa}, (select ifnull(max(numeracao + 1), 1) from Atm as atm where fkEmpresa = ${empresa}), "${ip}", 1, 1);
    `

    return database.executar(instrucaoSql);
}

module.exports = {
  cadastrarATM,
};