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
WHERE linha <= 5;
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

function getMaioresUsos(idEmpresa) {
    let instrucaoSql = `
        SELECT a.numeracao AS Numero_ATM, e.idEmpresa AS ID_Empresa, TRUNCATE(AVG(cap.valor), 2) AS   Media_Uso_CPU
        FROM Captura cap
        JOIN Componente comp ON cap.fkComponente = comp.idComponente AND cap.fkAtm = comp.fkAtm
        JOIN TipoComponente tc ON comp.fkTipoComponente = tc.idTipoComponente JOIN Atm a ON cap.fkAtm = a.idAtm
        JOIN Empresa e ON a.fkEmpresa = e.idEmpresa
        WHERE tc.nome = 'CPU' AND tc.unidadeMedida = '%' AND e.idEmpresa = ${idEmpresa}
        GROUP BY a.idAtm, a.numeracao, e.idEmpresa
        ORDER BY Media_Uso_CPU DESC
        LIMIT 3;
    `;
    console.log('Executando a instrução SQL: ' + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getAlertasHoje(idAtm, idEmpresa) {
    let instrucaoSql = `
        SELECT COUNT(*) as qtdAlertas FROM Alerta a
        JOIN Captura c ON a.fkCaptura = c.idCaptura
        JOIN Atm atm on c.fkAtm = atm.idAtm
        WHERE c.fkComponente = 1 
        AND c.fkAtm = ${idAtm} 
        AND atm.fkEmpresa = ${idEmpresa} 
        AND DATE(c.horario) = CURDATE();
    `;
    console.log('Executando a instrução SQL: ' + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    getDados,
    getAlertas,
    getMaioresUsos,
    getAlertasHoje,
};
