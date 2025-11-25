var database = require('../database/config');

function getAtms(idEmpresa) {
  let instrucaoSql = `
  SELECT * FROM vw_visao_geral WHERE fkEmpresa = ${idEmpresa}; 
  `;
  console.log('Executando a instrução SQL: ' + instrucaoSql);
  return database.executar(instrucaoSql);
}

function BuscarATM(idEmpresa, numeracao) {
  let instrucaoSql = `
SELECT * FROM vw_visao_geral WHERE fkEmpresa = ${idEmpresa} AND numeracao = ${numeracao}; 
  `;
  console.log('Executando a instrução SQL: ' + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  getAtms,
  BuscarATM
};
