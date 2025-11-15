var database = require("../database/config");

function cadastrarATM(empresa, ip) {
    var instrucaoSql = `
    insert into Atm (fkEmpresa, numeracao, IP, statusEstado, statusMonitoramento) values
        (${empresa}, (select ifnull(max(numeracao + 1), 1) from Atm as atm where fkEmpresa = ${empresa}), "${ip}", 1, 1);
    `

    return database.executar(instrucaoSql);
}

function validarCadastroATM(empresa) {
    var instrucaoSql = `
    select (select count(*) from Atm where fkEmpresa = ${empresa}) as 'qtdATMs', 
        maxATMs from Empresa join Plano on idPlano = fkPlano where idEmpresa = ${empresa};
    `

    return database.executar(instrucaoSql);
}

function atualizarParametro(empresa, tipoComponente, tipoAlerta, limiteMAX) {
    var instrucaoSql = `
      update Parametro set limiteMAX = ${limiteMAX} where fkEmpresa = ${empresa} and 
          fkTipoComponente = ${tipoComponente} and fkTipoAlerta = ${tipoAlerta};
    `

    return database.executar(instrucaoSql);
}

function exibirATMs(empresa) {
    var instrucaoSql = `

    select numeracao, IP,
		case when statusEstado = 3 then 'Sem informações'
        when statusMonitoramento = 3 then 'Normal'
        when statusMonitoramento = 2 then 'Moderado'
        when statusMonitoramento = 1 then 'Crítico'
        end as statusMonitoramento,
        case when statusEstado = 1 then 'Ligado'
        when statusEstado = 2 then 'Desigado'
        when statusEstado = 3 then 'Em manutenção'
        end as statusEstado from Atm where fkEmpresa = ${empresa};
    
    `
    return database.executar(instrucaoSql);
}

module.exports = {
  cadastrarATM,
  validarCadastroATM,
  atualizarParametro,
  exibirATMs,
};