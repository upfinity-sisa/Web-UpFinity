const database = require('../database/config');

function ObterKPI_1(idEmpresa) {
  console.log("Acessando o model: CarregarDadosGraficoUsoAtual para a Empresa:", idEmpresa);

  const instrucaoSql = `
    select ifnull(avg(c.valor), 0) as usoMedio from Captura c inner join Componente co  on c.fkComponente = co.idComponente 
    inner join Atm a on a.idAtm = co.fkAtm where a.fkEmpresa = ${idEmpresa} and c.fkcomponente = 2 and c.horario >= 
    date_sub(now(), interval 7 Day);
    `;
  return database.executar(instrucaoSql);
}

function ObterKPI_2(idEmpresa) {
  console.log("Acessando o model: CarregarDadosGraficoUsoAtual para a Empresa:", idEmpresa);

  const instrucaoSql = `
   select count(*) as qtdAlerta from Alerta al inner join Captura c on al.fkCaptura = c.idCaptura
   inner join Componente co on c.fkComponente = co.idComponente inner join Atm a on a.idAtm = co.fkAtm
   where a.fkEmpresa = ${idEmpresa} and c.fkcomponente = 2 and date(al.dataEmissao) = curdate();
   `;
  return database.executar(instrucaoSql);
}

function ObterKPI_3(idEmpresa) {
  console.log("Acessando o model: CarregarDadosGraficoUsoAtual para a Empresa:", idEmpresa);

  const instrucaoSql = `
 SELECT
  HOUR(c.horario) AS hora_do_dia,
  TRUNCATE(AVG(c.valor), 2) AS media_consumo
FROM Captura c
INNER JOIN Atm a
  ON c.fkAtm = a.idAtm
WHERE
  a.fkEmpresa = 1 -- CORREÇÃO: Substituímos ${idEmpresa} por um valor numérico (1)
  AND c.fkComponente = 2
  AND DATE(c.horario) = CURDATE()
GROUP BY
  HOUR(c.horario)
ORDER BY
  media_consumo DESC
LIMIT 1;                  
`;
  return database.executar(instrucaoSql);
}

function CarregarDadosGraficoUsoAtual(idEmpresa) {
  console.log("Acessando o model: CarregarDadosGraficoUsoAtual para a Empresa:", idEmpresa);

  const instrucaoSql = `
 SELECT
  HOUR(c.horario) AS hora_do_dia,
  TRUNCATE(AVG(c.valor), 2) AS media_consumo
FROM Captura c
INNER JOIN Atm a
  ON c.fkAtm = a.idAtm
WHERE
  a.fkEmpresa = 1 -- CORREÇÃO: Substituímos ${idEmpresa} por um valor numérico (1)
  AND c.fkComponente = 2
  AND DATE(c.horario) = CURDATE()
GROUP BY
  HOUR(c.horario)
ORDER BY
  media_consumo DESC
LIMIT 1;                
`;
  return database.executar(instrucaoSql);
}

module.exports = {
  ObterKPI_1,
  ObterKPI_2,
  ObterKPI_3,
  CarregarDadosGraficoUsoAtual
};