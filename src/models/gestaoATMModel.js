var database = require("../database/config");

function cadastrarATM(empresa, ip) {
    var instrucaoSql = `
    INSERT INTO Atm (fkEmpresa, numeracao, IP, statusEstado, statusMonitoramento) SELECT ${empresa}, IFNULL(MAX(numeracao) + 1, 1), "${ip}", 1, 0 FROM Atm  WHERE fkEmpresa = ${empresa};
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
        when statusMonitoramento = 0 then 'Normal'
        when statusMonitoramento = 2 then 'Moderado'
        when statusMonitoramento = 1 then 'Crítico'
        end as statusMonitoramento,
        case when statusEstado = 0 then 'Desligado'
        when statusEstado = 1 then 'Ligado'
        when statusEstado = 2 then 'Em manutenção'
        end as statusEstado from Atm where fkEmpresa = ${empresa};
    
    `
    return database.executar(instrucaoSql);
}

function removerAlertas(empresa, numeracao) {
    var instrucaoSql = `
        DELETE FROM Alerta 
        WHERE fkCaptura IN (
            SELECT idCaptura FROM Captura 
            WHERE fkAtm = (SELECT idAtm FROM Atm WHERE fkEmpresa = ${empresa} AND numeracao = ${numeracao})
        );
    `;
    return database.executar(instrucaoSql);
}
function removerCapturas(empresa, numeracao) {
    var instrucaoSql = `
        DELETE FROM Captura 
        WHERE fkAtm = (SELECT idAtm FROM Atm WHERE fkEmpresa = ${empresa} AND numeracao = ${numeracao});
    `;
    return database.executar(instrucaoSql);
}

function removerComponentes(empresa, numeracao) {
    var instrucaoSql = `
        DELETE FROM Componente 
        WHERE fkAtm = (SELECT idAtm FROM Atm WHERE fkEmpresa = ${empresa} AND numeracao = ${numeracao});
    `;
    return database.executar(instrucaoSql);
}

function removerATM(empresa, numeracao) {
    var instrucaoSql = `
        DELETE FROM Atm 
        WHERE fkEmpresa = ${empresa} AND numeracao = ${numeracao};
    `;
    return database.executar(instrucaoSql);
}

function atualizarEstado(empresa, numeracao, estado) {
    var instrucaoSql = `
    update Atm set statusEstado = ${estado} where fkEmpresa = ${empresa} and numeracao = ${numeracao};
    `

    return database.executar(instrucaoSql);
}

function atualizarATM(empresa, numeracao, estado, IP) {
    var instrucaoSql = `
    update Atm set statusEstado = ${estado}, IP = '${IP}' where fkEmpresa = ${empresa} and numeracao = ${numeracao};
    `

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarATM,
    validarCadastroATM,
    atualizarParametro,
    exibirATMs,
    removerAlertas,
    removerCapturas,
    removerComponentes,
    removerATM,
    atualizarEstado,
    atualizarATM,
};