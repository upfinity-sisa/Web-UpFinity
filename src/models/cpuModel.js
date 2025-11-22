var database = require('../database/config');

function getDados(idAtm) {
    let instrucaoSql = `
      WITH CapturasCpu AS (
    SELECT 
        ca.*, 
        ROW_NUMBER() OVER (
            PARTITION BY ca.fkComponente 
            ORDER BY ca.idCaptura DESC
        ) as linha
    FROM Captura ca
    JOIN Componente co ON ca.fkComponente = co.idComponente 
    WHERE co.idComponente IN (1, 5, 6) 
      AND ca.fkAtm = ${idAtm}
)

SELECT * FROM CapturasCpu
WHERE linha <= 10;
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
