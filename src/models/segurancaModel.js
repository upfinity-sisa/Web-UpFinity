var database = require("../database/config");

function exibirKPIinvasoes(idAtm, fkEmpresa) {
    var instrucaoSql = `
    select * from Invasao where fkSeguranca = (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "invasao" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa}) 
		    and horarioCaptura = (select max(horarioCaptura) from Invasao) order by horarioInvasao desc;
    `

    return database.executar(instrucaoSql);
}

function exibirPortasAbertas(idAtm, fkEmpresa) {
    var instrucaoSql = `
    select * from ConexaoAberta where 
	    (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "conexao" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa})
		    and horario = (select max(horario) from ConexaoAberta) order by possuiAlerta desc;
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
            and horario = (select max(horario) from ArquivoCritico) order by possuiAlerta desc;
    `

    return database.executar(instrucaoSql);
}

function exibirGrafico(idAtm, fkEmpresa) {
    var instrucaoSql = `
    SELECT
        WEEK(horario) AS semana,
        COUNT(*) AS total_alertas
    FROM (
        SELECT AlertaSeguranca.horario
        FROM AlertaSeguranca
        JOIN ConexaoAberta ON idAlertaSeguranca = fkAlertaSeguranca
        JOIN Seguranca ON idSeguranca = fkSeguranca
        WHERE 
            idSeguranca = (
                SELECT idSeguranca FROM Seguranca JOIN Atm ON idAtm = fkAtm 
                WHERE categoria = 'conexao' AND idAtm = ${idAtm} AND fkEmpresa = ${fkEmpresa}
            )
            -- *** ALTERAÇÃO AQUI: De 8 para 7 WEEK ***
            AND AlertaSeguranca.horario >= DATE_SUB(CURDATE(), INTERVAL 7 WEEK) 
        
        UNION ALL
        
        SELECT AlertaSeguranca.horario
        FROM AlertaSeguranca
        JOIN ArquivoCritico ON idAlertaSeguranca = fkAlertaSeguranca
        JOIN Seguranca ON idSeguranca = fkSeguranca
        WHERE 
            idSeguranca = (
                SELECT idSeguranca FROM Seguranca JOIN Atm ON idAtm = fkAtm 
                WHERE categoria = 'arquivo' AND idAtm = ${idAtm} AND fkEmpresa = ${fkEmpresa}
            )
            -- *** ALTERAÇÃO AQUI: De 8 para 7 WEEK ***
            AND AlertaSeguranca.horario >= DATE_SUB(CURDATE(), INTERVAL 7 WEEK)

        UNION ALL
        
        SELECT AlertaSeguranca.horario
        FROM AlertaSeguranca
        JOIN Invasao ON idAlertaSeguranca = fkAlertaSeguranca
        JOIN Seguranca ON idSeguranca = fkSeguranca
        WHERE 
            idSeguranca = (
                SELECT idSeguranca FROM Seguranca JOIN Atm ON idAtm = fkAtm 
                WHERE categoria = 'invasao' AND idAtm = ${idAtm} AND fkEmpresa = ${fkEmpresa}
            )
            -- *** ALTERAÇÃO AQUI: De 8 para 7 WEEK ***
            AND AlertaSeguranca.horario >= DATE_SUB(CURDATE(), INTERVAL 7 WEEK)

    ) AS alertas
    GROUP BY semana
    ORDER BY semana ASC
    LIMIT 8;
    `

    return database.executar(instrucaoSql);
}

function salvarArquivoSalvo(idAtm, fkEmpresa, conteudo01) {
    var instrucaoSql = `
    
    update ItemSalvo set conteudo02 = 

	(select hashArqCritico from ArquivoCritico where 
		(select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "arquivo" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa}) 
			and  horario = (select max(horario) from ArquivoCritico) and nome = '${conteudo01}')
            
	where conteudo01 = '${conteudo01}'
	and fkSeguranca = (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "arquivo" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa});

    `

    return database.executar(instrucaoSql);
}

function atualizarUltimaCapturaArquivo(idAtm, fkEmpresa, conteudo01) {
    var instrucaoSql = `
    
    update ArquivoCritico set possuiAlerta = 0 
        where fkSeguranca = (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "arquivo" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa})
        and nome = '${conteudo01}' 
        and idArquivoCritico = (select t.maxId from (select MAX(idArquivoCritico) as maxId from ArquivoCritico where fkSeguranca = (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "arquivo" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa}) 
        and nome = '${conteudo01}') as t);

    `

    return database.executar(instrucaoSql);
}

function selecionarSeguranca(idAtm, fkEmpresa) {
    var instrucaoSql = `
    SELECT CASE WHEN
        (select count(*) from ConexaoAberta where horario = (select max(horario) from ConexaoAberta) and 
        possuiAlerta = 1  and fkSeguranca = (select idSeguranca from Seguranca join Atm on idAtm = fkAtm 
        where categoria = "conexao" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa})) >= 1
        OR
        (select count(*) from ArquivoCritico where horario = (select max(horario) from ArquivoCritico) and
        possuiAlerta = 1 and fkSeguranca = (select idSeguranca from Seguranca join Atm on idAtm = fkAtm 
        where categoria = "arquivo" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa})) >= 1 then 'INSEGURO'
        ELSE 'SEGURO'
        END as seguranca;
    `

    return database.executar(instrucaoSql);
}

function salvarConexaoSalva(idAtm, fkEmpresa, conteudo01, conteudo02) {
    var instrucaoSql = `
    insert into ItemSalvo (categoria, conteudo01, conteudo02, fkSeguranca) values
    ('conexao', '${conteudo01}', '${conteudo02}', (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "conexao" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa}));
    `

    return database.executar(instrucaoSql);
}

function atualizarUltimaCapturaConexao(idAtm, fkEmpresa, conteudo01) {

    var instrucaoSql = `
    
    update ConexaoAberta set possuiAlerta = 0 
        where fkSeguranca = (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "conexao" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa})
        and portaLocal = '${conteudo01}' 
        and idConexaoAberta = (select t.maxId from (select MAX(idConexaoAberta) as maxId from ConexaoAberta where fkSeguranca = (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "conexao" and idAtm = ${idAtm} and fkEmpresa = ${fkEmpresa}) 
        and portaLocal = '${conteudo01}') as t);

    `

    return database.executar(instrucaoSql);

}

function buscarAtms(fkEmpresa) {
    var instrucaoSql = `
    select idAtm, numeracao from Atm where fkEmpresa = ${fkEmpresa};
    `

    return database.executar(instrucaoSql);
}


module.exports = {
  exibirKPIinvasoes,
  exibirPortasAbertas,
  exibirAlertas,
  exibirArquivosCriticos,
  exibirGrafico,
  salvarArquivoSalvo,
  atualizarUltimaCapturaArquivo,
  selecionarSeguranca,
  salvarConexaoSalva,
  atualizarUltimaCapturaConexao,
  buscarAtms,
};