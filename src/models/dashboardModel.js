var database = require('../database/config');

function ultimasCapturas(idAtm) {
    let instrucaoSql = `
    SELECT fkComponente, valor FROM Captura WHERE fkAtm = ${idAtm} AND fkComponente IN (1, 2, 3) ORDER BY idCaptura DESC LIMIT 30;
  `;
    console.log('Executando a instrução SQL: ' + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ultimasCapturasRede(idAtm) {
    let instrucaoSql = `
    SELECT fkComponente, valor FROM Captura WHERE fkAtm = ${idAtm} AND fkComponente = 4 ORDER BY idCaptura DESC LIMIT 10;
  `;
    console.log('Executando a instrução SQL: ' + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarParametros(idEmpresa) {
    let instrucaoSql = `
  SELECT * FROM Parametro WHERE fkEmpresa = ${idEmpresa} 
  `;
    console.log('Executando a instrução SQL: ' + instrucaoSql);

    return database.executar(instrucaoSql);
}

function pegarDowntime(idAtm, dataInicio, dataFim) {
    let instrucaoSql = `
  SELECT horario FROM Captura WHERE fkAtm = ${idAtm} AND horario BETWEEN '${dataFim}' AND '${dataInicio}' ORDER BY horario ASC;
  `;
    console.log('Executando a instrução SQL: ' + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarUltimosHorariosCaptura(idAtm) {
    let instrucaoSql = `
    SELECT DISTINCT horario FROM Captura WHERE fkAtm = ${idAtm} AND fkComponente IN (1, 2, 3) ORDER BY horario DESC LIMIT 10;
  `;
    console.log('Executando a instrução SQL: ' + instrucaoSql);
    return database.executar(instrucaoSql);
}

function carregarAlertas(idAtm) {
    let instrucaoSql = `
    select descricao, fkComponente, horario from Alerta a join TipoAlerta ta on ta.idTipoAlerta = a.fkTipoAlerta join Captura c on c.idCaptura = a.fkCaptura where fkAtm = ${idAtm};
  `;
    console.log('Executando a instrução SQL: ' + instrucaoSql);
    return database.executar(instrucaoSql);
}

function carregarAtms(idEmpresa) {
    let instrucaoSql = `
  select * from Atm where fkEmpresa = ${idEmpresa}; 
  `;
    console.log('Executando a instrução SQL: ' + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    ultimasCapturas,
    ultimasCapturasRede,
    pegarParametros,
    pegarDowntime,
    pegarUltimosHorariosCaptura,
    carregarAlertas,
    carregarAtms,
};
