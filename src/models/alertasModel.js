var database = require("../database/config");

function ObterKPI_1(fkEmpresa) {

  var instrucaoSql = `
  SELECT count(*) AS TotalAlerta 
  FROM Alerta a 
  INNER JOIN Captura c ON a.fkCaptura = c.idCaptura 
  INNER JOIN Atm atm ON c.fkAtm = atm.idAtm
  WHERE a.statusAlerta = 1
  AND atm.fkEmpresa = ${fkEmpresa};
  `

  return database.executar(instrucaoSql);
}

function ObterKPI_1_qtdCritico(fkEmpresa) {

  var instrucaoSql = `
  SELECT count(*) AS TotalAlertaCritico 
  FROM Alerta a 
  INNER JOIN Captura c ON a.fkCaptura = c.idCaptura 
  INNER JOIN Atm atm ON c.fkAtm = atm.idAtm
  WHERE a.statusAlerta = 1
  AND atm.fkEmpresa = ${fkEmpresa} AND a.fkTipoAlerta = 1;
  `

  return database.executar(instrucaoSql);
}

function ObterKPI_1_qtdModerado(fkEmpresa) {

  var instrucaoSql = `
  SELECT count(*) AS TotalAlertaModerado 
  FROM Alerta a 
  INNER JOIN Captura c ON a.fkCaptura = c.idCaptura 
  INNER JOIN Atm atm ON c.fkAtm = atm.idAtm
  WHERE a.statusAlerta = 1
  AND atm.fkEmpresa = ${fkEmpresa} AND a.fkTipoAlerta = 2;
  `

  return database.executar(instrucaoSql);
}

function ObterKPI_2(fkEmpresa) {

  var instrucaoSql = `
  SELECT 
  atm.numeracao AS Numeracao
  FROM Alerta a 
  INNER JOIN Captura c ON a.fkCaptura = c.idCaptura 
  INNER JOIN Atm atm ON c.fkAtm = atm.idAtm
  WHERE a.statusAlerta = 1 
  AND atm.fkEmpresa = ${fkEmpresa}
  GROUP BY atm.idAtm, atm.numeracao
  ORDER BY COUNT(a.idAlerta)
  LIMIT 1;
  `

  return database.executar(instrucaoSql);
}

function ObterKPI_2_qtdCritico(fkEmpresa) {

  var instrucaoSql = `
  SELECT 
      SUM(CASE WHEN a.fkTipoAlerta = 1 THEN 1 ELSE 0 END) AS TotalAlertaCritico
  FROM Alerta a
  INNER JOIN Captura c ON a.fkCaptura = c.idCaptura
  INNER JOIN Atm atm ON c.fkAtm = atm.idAtm
  WHERE a.statusAlerta = 1 
    AND atm.fkEmpresa = ${fkEmpresa}
  GROUP BY atm.idAtm, atm.numeracao
  ORDER BY COUNT(a.idAlerta) DESC
  LIMIT 1;
  `

  return database.executar(instrucaoSql);
}

function ObterKPI_2_qtdModerado(fkEmpresa) {

  var instrucaoSql = `
  SELECT 
      SUM(CASE WHEN a.fkTipoAlerta = 2 THEN 1 ELSE 0 END) AS TotalAlertaModerado
  FROM Alerta a
  INNER JOIN Captura c ON a.fkCaptura = c.idCaptura
  INNER JOIN Atm atm ON c.fkAtm = atm.idAtm
  WHERE a.statusAlerta = 1 
    AND atm.fkEmpresa = ${fkEmpresa}
  GROUP BY atm.idAtm, atm.numeracao
  ORDER BY COUNT(a.idAlerta) DESC
  LIMIT 1;
  `

  return database.executar(instrucaoSql);
}


function ObterKPI_3(fkEmpresa) {

  var instrucaoSql = `
  SELECT count(*) AS TotalResolvido
  FROM Alerta a 
  INNER JOIN Captura c ON a.fkCaptura = c.idCaptura 
  INNER JOIN Atm atm ON c.fkAtm = atm.idAtm
  WHERE a.statusAlerta = 0 
    AND atm.fkEmpresa = ${fkEmpresa}
    AND a.dataResolucao >= DATE_SUB(NOW(), INTERVAL 1 MONTH);
  `

  return database.executar(instrucaoSql);
}

function ObterKPI_3_qtdCritico(fkEmpresa) {

  var instrucaoSql = `
  SELECT count(*) AS TotalResolvidoCritico
  FROM Alerta a 
  INNER JOIN Captura c ON a.fkCaptura = c.idCaptura 
  INNER JOIN Atm atm ON c.fkAtm = atm.idAtm
  WHERE a.statusAlerta = 0 
    AND atm.fkEmpresa = ${fkEmpresa}
    AND a.dataResolucao >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
    AND a.fkTipoAlerta = 1;
  `

  return database.executar(instrucaoSql);
}

function ObterKPI_3_qtdModerado(fkEmpresa) {

  var instrucaoSql = `
  SELECT count(*) AS TotalResolvidoModerado
  FROM Alerta a 
  INNER JOIN Captura c ON a.fkCaptura = c.idCaptura 
  INNER JOIN Atm atm ON c.fkAtm = atm.idAtm
  WHERE a.statusAlerta = 0 
    AND atm.fkEmpresa = ${fkEmpresa}
    AND a.dataResolucao >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
    AND a.fkTipoAlerta = 2;
  `

  return database.executar(instrucaoSql);
}

function Grafico_Bar(fkEmpresa) {

  var instrucaoSql = `
  SELECT 
     tc.nome AS NomeComponente,
     COUNT(sub.idAlerta) AS TotalAlertas,
     IFNULL(SUM(CASE WHEN sub.statusAlerta = 1 THEN 1 ELSE 0 END), 0) AS QtdPendentes,
     IFNULL(SUM(CASE WHEN sub.statusAlerta = 0 THEN 1 ELSE 0 END), 0) AS QtdResolvidos
  FROM TipoComponente tc
  LEFT JOIN (
    SELECT 
        a.idAlerta, 
        a.statusAlerta, 
        co.fkTipoComponente
    FROM Alerta a
    INNER JOIN Captura c ON a.fkCaptura = c.idCaptura
    INNER JOIN Atm atm ON c.fkAtm = atm.idAtm
    INNER JOIN Componente co ON c.fkComponente = co.idComponente AND c.fkAtm = co.fkAtm
    WHERE atm.fkEmpresa = ${fkEmpresa}
      AND a.dataEmissao >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
  ) AS sub ON tc.idTipoComponente = sub.fkTipoComponente
  GROUP BY tc.idTipoComponente, tc.nome;
  `

  return database.executar(instrucaoSql);
}

module.exports = {
  ObterKPI_1,
  ObterKPI_1_qtdCritico,
  ObterKPI_1_qtdModerado,
  ObterKPI_2,
  ObterKPI_2_qtdCritico,
  ObterKPI_2_qtdModerado,
  ObterKPI_3,
  ObterKPI_3_qtdCritico,
  ObterKPI_3_qtdModerado,
  Grafico_Bar
}