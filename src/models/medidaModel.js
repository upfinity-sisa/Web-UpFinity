var database = require("../database/config");

function buscarMedidasEmTempoReal(idAtm) {
    var instrucaoSql = `
        SELECT 
            nomeRede, 
            MBRecebidos, 
            MBEnviados,  
            pacotesRecebidos, 
            pacotesEnviados, 
            DATE_FORMAT(horario,'%H:%i:%s') as momento_grafico 
        FROM CapturaRede 
        WHERE fkAtm = 1
        ORDER BY idCapturaRede DESC 
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosGrafico(idAtm) {
    var instrucaoSql = `
        SELECT 
            MBRecebidos, 
            MBEnviados,  
            DATE_FORMAT(horario,'%H:%i:%s') as momento_grafico 
        FROM CapturaRede 
        WHERE fkAtm = 1
        ORDER BY idCapturaRede DESC 
        LIMIT 15; -- Retorna as últimas 15 medições para o gráfico
    `;

    console.log("Executando a instrução SQL para o gráfico: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMedidasEmTempoReal,
    buscarDadosGrafico 
}