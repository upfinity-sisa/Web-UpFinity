var database = require("../database/config");

function ultimasCapturas(idAtm) {
  let instrucaoSql = `
    SELECT fkComponente, valor FROM Captura WHERE fkAtm = ${idAtm} ORDER BY idCaptura DESC LIMIT 30;
  `;
  console.log('Executando a instrução SQL: ' + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  ultimasCapturas
}