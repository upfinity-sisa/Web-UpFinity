const database = require('../database/config');

function buscarDadosRamTempoReal(idAtm) {
    console.log("Acessando o model: buscarDadosRamTempoReal para o ATM:", idAtm);

    const instrucaoSql = `
        SELECT
            c.valor,
            DATE_FORMAT(c.horario,'%H:%i:%s') as momento_grafico
        FROM Captura c
        JOIN Componente comp ON c.fkAtmComponente = comp.idComponente
        JOIN TipoComponente tc ON comp.fkTipoComponente = tc.idTipoComponente
        WHERE comp.fkAtm = ${idAtm} AND tc.nome = 'RAM'
        ORDER BY c.horario DESC
        LIMIT 15;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function buscarKpiUsoMedio(idAtm) {
    console.log("Acessando o model: buscarKpiUsoMedio para o ATM:", idAtm);

    const instrucaoSql = `
        SELECT
            AVG(c.valor) AS usoMedio
        FROM Captura c
        JOIN Componente comp ON c.fkAtmComponente = comp.idComponente
        JOIN TipoComponente tc ON comp.fkTipoComponente = tc.idTipoComponente
        WHERE comp.fkAtm = ${idAtm} AND tc.nome = 'RAM'
        AND c.horario >= DATE_SUB(NOW(), INTERVAL 7 DAY);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiAppMaiorUso(idAtm) {
    console.log("Acessando o model: buscarKpiAppMaiorUso para o ATM:", idAtm);
    
    const instrucaoSql = `
        -- Lógica SIMULADA: Você precisaria de dados de PROCESSO para RAM.
        -- Assumindo que você tem uma tabela de processos com fkCaptura
        SELECT 'Spooler' AS nomeApp, 2.5 AS usoGB; -- Exemplo Fictício
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return new Promise(resolve => {
        resolve([{ nomeApp: 'Chrome', usoGB: (Math.random() * 5 + 1).toFixed(1) }]);
    });
}


function buscarRamTotal(idAtm) {
    console.log("Acessando o model: buscarRamTotal para o ATM:", idAtm);

    const instrucaoSql = `
        -- SQL para buscar a capacidade total de RAM do componente
        SELECT 16 AS ramTotalGB; -- Exemplo Fictício (substitua pela busca real)
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return new Promise(resolve => {
        resolve([{ ramTotalGB: 16 }]);
    });
}

function CarregarDadosGraficoUsoAtual(idEmpresa) {
    console.log("Acessando o model: CarregarDadosGraficoUsoAtual para a Empresa:", idEmpresa);
    const instrucaoSql = `
    
    `;
    return database.executar(instrucaoSql);
}
module.exports = {
    buscarDadosRamTempoReal,
    buscarKpiUsoMedio,
    buscarKpiAppMaiorUso,
    buscarRamTotal,
    CarregarDadosGraficoUsoAtual
};