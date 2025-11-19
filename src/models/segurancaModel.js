var database = require("../database/config");

function exibirKPIinvasoes(idAtm) {
    var instrucaoSql = `
    select * from Invasao where fkSeguranca = 
	    (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "invasao" and idAtm = ${idAtm})
		    and horarioCaptura = (select max(horarioCaptura) from Invasao);
    `

    return database.executar(instrucaoSql);
}

function exibirKPIarquivos(idAtm) {
    var instrucaoSql = `
    select ArquivoCritico.* from 
		AlertaSeguranca join ArquivoCritico
        on idAlertaSeguranca = fkAlertaSeguranca
        join Seguranca on
        idSeguranca = fkSeguranca
        where idSeguranca = (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "arquivo" and idAtm = ${idAtm})
        and ArquivoCritico.horario = (select max(horario) from ArquivoCritico);
    `

    return database.executar(instrucaoSql);
}

function exibirPortasAbertas(idAtm) {
    var instrucaoSql = `
    select * from ConexaoAberta where 
	    (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "conexao" and idAtm = ${idAtm})
		    and horario = (select max(horario) from ConexaoAberta);
    `

    return database.executar(instrucaoSql);
}

function exibirKPIconexoesSUS(idAtm) {
    var instrucaoSql = `
    select ConexaoAberta.* from 
		AlertaSeguranca join ConexaoAberta
        on idAlertaSeguranca = fkAlertaSeguranca
        join Seguranca on
        idSeguranca = fkSeguranca
        where idSeguranca = (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "conexao" and idAtm = ${idAtm})
        and ConexaoAberta.horario = (select max(horario) from ConexaoAberta);
    `

    return database.executar(instrucaoSql);
}

module.exports = {
  exibirKPIinvasoes,
  exibirKPIarquivos,
  exibirPortasAbertas,
  exibirKPIconexoesSUS,
};