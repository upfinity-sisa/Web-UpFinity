var database = require("../database/config");

function buscarMedidasEmTempoReal(idAtm) {
    var instrucaoSql = `
        SELECT 
            nomeRede, 
            MBRecebidos, 
            MBEnviados,  -- ADICIONADO AQUI
            pacotesRecebidos, 
            pacotesEnviados, 
            DATE_FORMAT(horario,'%H:%i:%s') as momento_grafico 
        FROM CapturaRede 
        WHERE fkAtm = ${idAtm} 
        ORDER BY idCapturaRede DESC 
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMedidasEmTempoReal
}