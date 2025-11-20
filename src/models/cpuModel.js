var database = require('../database/config');

function getDados(idAtm) {
    let instrucaoSql = `
      SELECT fkComponente, valor FROM Captura WHERE fkAtm = ${idAtm} AND fkComponente IN (1, 2, 3) ORDER BY idCaptura DESC LIMIT 30;
    `;
    console.log('Executando a instrução SQL: ' + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getAlertas(idAtm) {
    let instrucaoSql = `
      SELECT fkComponente, valor FROM Captura WHERE fkAtm = ${idAtm} AND fkComponente IN (1, 2, 3) ORDER BY idCaptura DESC LIMIT 30;
    `;
    console.log('Executando a instrução SQL: ' + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    getDados,
    getAlertas,
};
