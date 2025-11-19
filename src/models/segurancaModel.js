var database = require("../database/config");

function exibirKPIinvasoes(idAtm, fkEmpresa) {
    var instrucaoSql = `
    select * from Invasao where fkSeguranca = (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "invasao" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa}) 
		    and horarioCaptura = (select max(horarioCaptura) from Invasao);
    `

    return database.executar(instrucaoSql);
}

function exibirPortasAbertas(idAtm, fkEmpresa) {
    var instrucaoSql = `
    select * from ConexaoAberta where 
	    (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "conexao" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa})
		    and horario = (select max(horario) from ConexaoAberta);
    `

    return database.executar(instrucaoSql);
}

function exibirKPIconexoesSUS(idAtm, fkEmpresa) {
    var instrucaoSql = `
    select ConexaoAberta.* from 
		AlertaSeguranca join ConexaoAberta
        on idAlertaSeguranca = fkAlertaSeguranca
        join Seguranca on
        idSeguranca = fkSeguranca
        where idSeguranca = (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "conexao" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa})
        and ConexaoAberta.horario = (select max(horario) from ConexaoAberta);
    `

    return database.executar(instrucaoSql);
}

function exibirAlertas(idAtm, fkEmpresa) {
    var instrucaoSql = `
    select AlertaSeguranca.* from 
		AlertaSeguranca join ConexaoAberta
        on idAlertaSeguranca = fkAlertaSeguranca
        join Seguranca on
        idSeguranca = fkSeguranca
        where idSeguranca = (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "conexao" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa})
    UNION ALL
    select AlertaSeguranca.* from 
            AlertaSeguranca join ArquivoCritico
            on idAlertaSeguranca = fkAlertaSeguranca
            join Seguranca on
            idSeguranca = fkSeguranca
            where idSeguranca = (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "arquivo" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa})
    UNION ALL
    select AlertaSeguranca.* from 
            AlertaSeguranca join Invasao
            on idAlertaSeguranca = fkAlertaSeguranca
            join Seguranca on
            idSeguranca = fkSeguranca
            where idSeguranca = (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "invasao" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa})
            ORDER BY horario desc;
    `

    return database.executar(instrucaoSql);
}

function exibirArquivosCriticos(idAtm, fkEmpresa) {
    var instrucaoSql = `
    select * from ArquivoCritico where 
	    (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "arquivo" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa})
            and horario = (select max(horario) from ArquivoCritico) order by fkAlertaSeguranca desc;
    `

    return database.executar(instrucaoSql);
}


module.exports = {
  exibirKPIinvasoes,
  exibirPortasAbertas,
  exibirKPIconexoesSUS,
  exibirAlertas,
  exibirArquivosCriticos,
};