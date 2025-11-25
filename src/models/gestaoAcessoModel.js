var database = require("../database/config");

function carregarLoginSucesso(dia) {
  var instrucaoSql = `SELECT COUNT(*) AS LoginsSucesso FROM LogAcesso WHERE stats = 1 AND DATE(dataHora) = '${dia}';`;

  return database.executar(instrucaoSql);
}

function carregarLoginFalho(dia) {
  var instrucaoSql = `SELECT COUNT(*) AS LoginsFalhos FROM LogAcesso WHERE stats = 0 AND DATE(dataHora) = '${dia}';`;

  return database.executar(instrucaoSql);
}

function loginsPorHora(dia) {
  var instrucaoSql = `SELECT HOUR(dataHora) AS hora,
    COUNT(*) AS total
    FROM LogAcesso
    WHERE stats = 1 AND DATE(dataHora) = '${dia}'
    GROUP BY HOUR(dataHora)
    ORDER BY hora;`;

  return database.executar(instrucaoSql);
}

function empresaSemPlano() {

  var instrucaoSql = `SELECT COUNT(*) AS empresaSemPlano FROM Empresa WHERE fkPlano IS NULL OR statusPagamento = 0;`;

  return database.executar(instrucaoSql);
}

function novosUsuariosPorSemana() {
  var instrucaoSql = `SELECT DATE(minPrimeiroLogin) AS dia,
    COUNT(*) AS novos_usuarios FROM (
    SELECT fkUsuario, MIN(dataHora) AS minPrimeiroLogin FROM LogAcesso WHERE fkUsuario IS NOT NULL
    GROUP BY fkUsuario) AS primeiros
    WHERE minPrimeiroLogin >= CURDATE() - INTERVAL 7 DAY
    GROUP BY dia
    ORDER BY dia;
    `;
  return database.executar(instrucaoSql);
}

module.exports = {
  carregarLoginSucesso,
  carregarLoginFalho,
  loginsPorHora,
  empresaSemPlano,
  novosUsuariosPorSemana,
};