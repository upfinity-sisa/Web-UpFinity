var ramModel = require('../models/ramModel');

function buscarDadosRam(req, res) {
    const idAtm = req.params.idAtm;

    if (idAtm === undefined) {
        res.status(400).send("O ID do ATM não foi fornecido.");
        return;
    }

    // Função para buscar dados do gráfico em tempo real (ultimas 15 capturas)
    const promessaGrafico = ramModel.buscarDadosRamTempoReal(idAtm)
        .then(resultado => {
             // Inverte a ordem para que o Chart.js exiba do mais antigo para o mais novo
            resultado.reverse();

            const dadosFormatados = resultado.map(item => ({
                valor: item.valor, // Valor em %
                momento: item.momento_grafico // Hora (hh:mm:ss)
            }));
            
            return { dadosGrafico: dadosFormatados };
        })
        .catch(erro => {
            console.error("Erro ao buscar dados de RAM em tempo real:", erro);
            return { dadosGrafico: [] };
        });

    // Função para buscar o KPI de Uso Médio (em GB)
    const promessaUsoMedio = ramModel.buscarKpiUsoMedio(idAtm)
        .then(resultado => {
            const usoMedioGB = resultado.length > 0 ? parseFloat(resultado[0].usoMedio).toFixed(1) : '--';
            return { usoMedioGB };
        })
        .catch(erro => {
            console.error("Erro ao buscar KPI Uso Médio:", erro);
            return { usoMedioGB: '--' };
        });

    // Função para buscar o KPI da Aplicação de Maior Uso
    const promessaAppMaiorUso = ramModel.buscarKpiAppMaiorUso(idAtm)
        .then(resultado => {
            let nomeApp = '--';
            let usoAppGB = '--';

            if (resultado.length > 0) {
                nomeApp = resultado[0].nomeApp;
                usoAppGB = parseFloat(resultado[0].usoGB).toFixed(1);
            }
            return { nomeApp, usoAppGB };
        })
        .catch(erro => {
            console.error("Erro ao buscar KPI App Maior Uso:", erro);
            return { nomeApp: '--', usoAppGB: '--' };
        });

    Promise.all([promessaGrafico, promessaUsoMedio, promessaAppMaiorUso])
        .then(resultados => {
            const resposta = {
                ...resultados[0],
                ...resultados[1],
                ...resultados[2]  
            };
            res.status(200).json(resposta);
        })
        .catch(erro => {
            console.error("Erro geral na busca de dados de RAM:", erro);
            res.status(500).json({ erro: "Erro interno do servidor ao buscar dados de RAM." });
        });
}

function buscarRamTotal(req, res) {
    const idAtm = req.params.idAtm;

    if (idAtm === undefined) {
        res.status(400).send("O ID do ATM não foi fornecido.");
        return;
    }

    ramModel.buscarRamTotal(idAtm)
        .then(resultado => {
            const ramTotalGB = resultado.length > 0 ? resultado[0].ramTotalGB : 0;
            res.status(200).json({ ramTotalGB });
        })
        .catch(erro => {
            console.error("Erro ao buscar RAM total:", erro);
            res.status(500).json({ erro: "Erro interno do servidor ao buscar RAM total." });
        });
}

module.exports = {
    buscarDadosRam,
    buscarRamTotal
};