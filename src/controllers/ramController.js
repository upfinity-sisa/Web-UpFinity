var ramModel = require('../models/ramModel');

function buscarDadosRam(req, res) {
    const idAtm = req.params.idAtm;

    if (idAtm === undefined) {
        res.status(400).send("O ID do ATM não foi fornecido.");
        return;
    }

    
    const promessaGrafico = ramModel.buscarDadosRamTempoReal(idAtm)
        .then(resultado => {
             
            resultado.reverse();

            const dadosFormatados = resultado.map(item => ({
                valor: item.valor, 
                momento: item.momento_grafico 
            }));
            
            return { dadosGrafico: dadosFormatados };
        })
        .catch(erro => {
            console.error("Erro ao buscar dados de RAM em tempo real:", erro);
            return { dadosGrafico: [] };
        });

    
    const promessaUsoMedio = ramModel.buscarKpiUsoMedio(idAtm)
        .then(resultado => {
            const usoMedioGB = resultado.length > 0 ? parseFloat(resultado[0].usoMedio).toFixed(1) : '--';
            return { usoMedioGB };
        })
        .catch(erro => {
            console.error("Erro ao buscar KPI Uso Médio:", erro);
            return { usoMedioGB: '--' };
        });

    
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

function CarregarDadosGraficoUsoAtual(req, res) {
    const idEmpresa = req.params.idEmpresa;
    ramModel.CarregarDadosGraficoUsoAtual(idEmpresa)
        .then(resultado => {
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.error("Erro ao carregar dados do gráfico de uso atual:", erro);
            res.status(500).json({ erro: "Erro interno do servidor ao carregar dados do gráfico de uso atual." });
        });
}

module.exports = {
    buscarDadosRam,
    buscarRamTotal,
    CarregarDadosGraficoUsoAtual
};