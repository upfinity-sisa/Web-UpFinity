const database = require('../database/config');

function ObterKPI_1(idEmpresa) {
    console.log("Acessando o model: CarregarDadosGraficoUsoAtual para a Empresa:", idEmpresa);

    const instrucaoSql = `
    select ifnull(avg(c.valor), 0) as usoMedio from Captura c inner join Componente co  on c.fkComponente = co.idComponente inner join Atm a on a.idAtm = co.fkAtm where a.fkEmpresa = ${idEmpresa} and c.fkcomponente = 2 and c.horario >= date_sub(now(), interval 7 Day);
    `;
    return database.executar(instrucaoSql);
}

function ObterKPI_2(idEmpresa) {
    console.log("Acessando o model: CarregarDadosGraficoUsoAtual para a Empresa:", idEmpresa);
    
    const instrucaoSql = `
   SELECT
  COUNT(*) AS qtdAlerta
FROM Alerta al
INNER JOIN Captura c
  ON al.fkCaptura = c.idCaptura
INNER JOIN Componente co
  ON c.fkComponente = co.idComponente
INNER JOIN Atm a
  ON a.idAtm = co.fkAtm
WHERE
  a.fkEmpresa = ${idEmpresa}
  AND c.fkcomponente = 2
  AND DATE(al.dataEmissao) = CURDATE();
    `;
    return database.executar(instrucaoSql);
}

function ObterKPI_3(idEmpresa) {
    console.log("Acessando o model: CarregarDadosGraficoUsoAtual para a Empresa:", idEmpresa);
    
    const instrucaoSql = `
   SELECT
  COUNT(*) AS qtdAlerta
FROM Alerta al
INNER JOIN Captura c
  ON al.fkCaptura = c.idCaptura
INNER JOIN Componente co
  ON c.fkComponente = co.idComponente
INNER JOIN Atm a
  ON a.idAtm = co.fkAtm
WHERE
  a.fkEmpresa = ${idEmpresa}
  AND c.fkcomponente = 2
  AND DATE(al.dataEmissao) = CURDATE();
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    ObterKPI_1,
    ObterKPI_2,
    ObterKPI_3
};