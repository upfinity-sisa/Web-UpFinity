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
    CONCAT(HOUR(c.horario), ' hrs') AS hora_do_dia,
    TRUNCATE(AVG(c.valor), 2) AS media_consumo
FROM Captura c
INNER JOIN Atm a ON c.fkAtm = a.idAtm
WHERE a.fkEmpresa = ${idEmpresa}
  AND c.fkComponente = 2
  AND DATE(c.horario) = CURDATE()
GROUP BY CONCAT(HOUR(c.horario), ' hrs')
ORDER BY media_consumo DESC
LIMIT 1;             
  `;
  console.log(instrucaoSql);
  return database.executar(instrucaoSql);
}

function CarregarDadosGraficoUsoAtual(idEmpresa) {
  console.log("Acessando o model: CarregarDadosGraficoUsoAtual para a Empresa:", idEmpresa);

  const instrucaoSql = `
  SELECT 
    c.valor as usoAtualRam , 
    DATE_FORMAT(c.horario, '%H:%i:%s') AS horario
FROM Captura c
JOIN Componente co 
    ON c.fkComponente = co.idComponente
JOIN Atm a 
    ON co.fkAtm = a.idAtm
WHERE a.fkEmpresa = 2 
  AND co.fkTipoComponente = 2
ORDER BY c.horario DESC
LIMIT 10;
  `;
  return database.executar(instrucaoSql);
}



function CarregarDadosGraficoDeUso (idEmpresa) {
  console.log("Acessando o model: CarregarDadosGraficoUsoAtual para a Empresa:", idEmpresa);
  
  const instrucaoSql = `
  select (case when c.valor > 85 then 'Crítico' when c.valor >= 60 and c.valor <= 85 then 'Moderado'else 'Normal'
  end) as statusUso from Captura c join Componente co on c.fkComponente = co.idComponente join
  Atm a on co.fkAtm = a.idAtm where a.fkEmpresa = 2 and co.fkTipoComponente = 2 order by c.horario desc limit 1;
  `;
  return database.executar(instrucaoSql);
}

module.exports = {
  ObterKPI_1,
  ObterKPI_2,
  ObterKPI_3,
  CarregarDadosGraficoUsoAtual,
  CarregarDadosGraficoDeUso
};