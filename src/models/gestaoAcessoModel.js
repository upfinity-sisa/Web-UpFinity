var database = require("../database/config");

function buscarAlertasHoje() {
  var instrucaoSql = `
  SELECT COUNT(*) AS totalAlertasHoje FROM Alerta a 
  JOIN Captura c ON c.idCaptura = a.fkCaptura
  WHERE DATE(c.horario) = CURDATE();`;

  return database.executar(instrucaoSql);
}

function buscarATMSoff() {
  var instrucaoSql = `
  SELECT COUNT(*) AS atmsOff FROM Atm WHERE statusEstado = 0;`;

  return database.executar(instrucaoSql);
}

function buscarATMScriticos() {
  var instrucaoSql = `
  SELECT COUNT(*) AS atmsCriticos FROM Atm WHERE statusEstado = 2;`;

  return database.executar(instrucaoSql);
}

function carregarLoginSucesso() {
  var instrucaoSql = `SELECT COUNT(*) AS LoginsSucesso FROM LogAcesso WHERE stats = 1;`;

  return database.executar(instrucaoSql);
}

function carregarLoginFalho() {
  var instrucaoSql = `SELECT COUNT(*) AS LoginsFalhos FROM LogAcesso WHERE stats = 0;`;

  return database.executar(instrucaoSql);
}

function loginsPorHora() {
  var instrucaoSql = `SELECT HOUR(dataHora) AS hora,
    COUNT(*) AS total
    FROM LogAcesso
    WHERE stats = 1
    GROUP BY HOUR(dataHora)
    ORDER BY hora;`;

    return database.executar(instrucaoSql);
}

module.exports = {
  buscarAlertasHoje,
  buscarATMSoff,
  buscarATMScriticos,
  carregarLoginSucesso,
  carregarLoginFalho,
  loginsPorHora,
};