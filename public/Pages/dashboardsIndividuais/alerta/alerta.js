
function vwParaPx(vwValue) {
    const larguraViewport = window.innerWidth;
    const valorEmPx = (larguraViewport / 100) * vwValue;
    return Math.round(valorEmPx);
}
const grafico1 = document.getElementById('grafico1')
var options_grafico1 = {
    chart: {
        type: 'bar',
        height: 380,
        stacked: false,
    },
    series: [
        { name: 'Pendentes', data: [3, 5, 10, 20] },
        { name: 'Resolvidos', data: [5, 15, 40, 50] },
        { name: 'Total', data: [8, 20, 50, 70] }
    ],
    colors: ['#8c91cd', '#58f058', '#5acfd3ff'],
    xaxis: {
        categories: ['Rede', 'Disco', 'RAM', 'CPU']
    },
    plotOptions: {
        bar: {
            horizontal: true,
            borderRadius: 1,
            barHeight: '90%',
        }
    },
    stroke: {
        show: true,
        width: 6,
        colors: ['transparent']
    },

    dataLabels: {
        enabled: false,
        style: { colors: ['#fff'] }
    },
    legend: {
        show: true,
        position: 'top'
    }
}

var chart_grafico1 = new ApexCharts(grafico1, options_grafico1);
chart_grafico1.render();

const grafico2 = document.getElementById('grafico2')

var options_grafico2 = {
    chart: {
        type: 'boxPlot',
        height: 380
    },
    series: [
        {
            name: 'Estatística (Padrão)',
            type: 'boxPlot',
            data: [
                {
                    x: 'CPU',
                    // [Min, Q1, Mediana, Q3, Max]
                    y: []
                },
                {
                    x: 'RAM',
                    y: []
                },
                {
                    x: 'Disco',
                    y: []
                },
                {
                    x: 'Rede',
                    y: []
                }
            ]
        },
        {
            name: 'Outliers (Anomalias)',
            type: 'scatter',
            data: [
                { x: 'CPU', y: 65 },

                { x: 'RAM', y: 120 },

                { x: 'Disco', y: 80 },

                { x: 'Rede', y: 130 }
            ]
        }
    ],
    colors: ['#00C6CC', '#f775ceff'],
    xaxis: {
        type: 'category',
        tooltip: {
            formatter: function (val) {
                return val;
            }
        }
    },
    yaxis: {
        title: {
            text: 'Minutos'
        }
    },
    plotOptions: {

        boxPlot: {
            colors: {
                upper: '#6cd8dcff',
                lower: '#529ec2ff'
            }
        }
    },
    tooltip: {
        shared: false,
        intersect: true
    }
};

var chart_grafico2 = new ApexCharts(grafico2, options_grafico2);
chart_grafico2.render();

const grafico3 = document.getElementById('grafico3')

var options_grafico3 = {
    chart: {
        type: 'pie',
        height: 220
    },

    series: [0, 0],

    labels: ['Moderado', 'Crítico'],
    colors: ['#ffd717', '#FB2B3A'],

    dataLabels: {
        enabled: true,
        dropShadow: {
            enabled: false,
        },
        formatter: function (val) {
            return val.toFixed(1) + "%";
        },
        style: {
            fontSize: `${vwParaPx(1)}`,
            colors: ['#000000ff'],
            fontWeight: 550
        }
    },
    legend: {
        show: true,
        position: 'bottom'

    }
};

var chart_grafico3 = new ApexCharts(grafico3, options_grafico3);
chart_grafico3.render();

const img_fechar_gerenciar = document.getElementById('img_fechar_gerenciar')
const btn_abrir_gerenciar = document.getElementById('btn_gerenciar')
const container_pai_gerenciar = document.getElementById('container_sombra')

img_fechar_gerenciar.addEventListener('click', function () {
    CarregarDadosDashboard()
    container_pai_gerenciar.classList.add('d-none')
})

btn_abrir_gerenciar.addEventListener('click', function () {
    ObterHistoricoATM();
    container_pai_gerenciar.classList.remove('d-none')
})

let totalAlertasPendentes = 0
let totalPendentesCriticos = 0
let totalPendentesModerados = 0

function CarregarDadosDashboard() {
    ObterKPI_1();
    ObterKPI_2();
    ObterKPI_3();

    ObterGrafico_Bar();
    ObterHistorico();
    obterDadosBoxplot();
    let dataAtual = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataAtual.getSeconds()).padStart(2, '0');


    spn_dataHora_ultimaAtualizacao.innerText = `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`
}

window.onload = function () {
    CarregarDadosDashboard()
    ObterHistoricoATM();
};

setInterval(CarregarDadosDashboard, 3000);

let idEmpresa = sessionStorage.getItem('FK_EMPRESA');
console.log("id da empresa: " + idEmpresa)

function ObterKPI_1() {

    const dado_kpi_1 = document.getElementById('h2_kpi_1')
    const spn_kpi_1_critico = document.getElementById('spn_kpi_1_critico')
    const spn_kpi_1_moderado = document.getElementById('spn_kpi_1_moderado')

    fetch(`/alertas/ObterKPI_1/${idEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(jsonKPI_1 => {
                console.log(jsonKPI_1);
                console.log(JSON.stringify(jsonKPI_1));
                dado_kpi_1.innerText = jsonKPI_1.TotalAlerta;
                totalAlertasPendentes = jsonKPI_1.TotalAlerta;
            });

            // Obtendo qtd critica

            fetch(`/alertas/ObterKPI_1_qtdCritico/${idEmpresa}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {
                if (resposta.ok) {
                    console.log(resposta);

                    resposta.json().then(jsonKPI_1_qtdCritico => {
                        console.log(jsonKPI_1_qtdCritico);
                        console.log(JSON.stringify(jsonKPI_1_qtdCritico));
                        spn_kpi_1_critico.innerText = jsonKPI_1_qtdCritico.TotalAlertaCritico;
                        totalPendentesCriticos = jsonKPI_1_qtdCritico.TotalAlertaCritico;
                    });

                    // Obtendo qtd moderada

                    fetch(`/alertas/ObterKPI_1_qtdModerado/${idEmpresa}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (resposta) {
                        if (resposta.ok) {
                            console.log(resposta);

                            resposta.json().then(jsonKPI_1_qtdModerado => {
                                console.log(jsonKPI_1_qtdModerado);
                                console.log(JSON.stringify(jsonKPI_1_qtdModerado));
                                spn_kpi_1_moderado.innerText = jsonKPI_1_qtdModerado.TotalAlertaModerado;
                                totalPendentesModerados = jsonKPI_1_qtdModerado.TotalAlertaModerado;

                                ObterGrafico_Pizza()
                            });


                        } else {
                            console.log("Houve um erro ao tentar obter a KPI 1");
                            resposta.text().then(texto => {
                                console.error(texto);

                            });
                        }

                    }).catch(function (erro) {
                        console.log(erro);
                    })

                } else {
                    console.log("Houve um erro ao tentar obter a KPI 1");
                    resposta.text().then(texto => {
                        console.error(texto);

                    });
                }

            }).catch(function (erro) {
                console.log(erro);
            })
        } else {
            console.log("Houve um erro ao tentar obter a KPI 1");
            resposta.text().then(texto => {
                console.error(texto);

            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function ObterKPI_2() {

    const dado_kpi_2 = document.getElementById('h2_kpi_2')
    const spn_kpi_2_critico = document.getElementById('spn_kpi_2_critico')
    const spn_kpi_2_moderado = document.getElementById('spn_kpi_2_moderado')

    fetch(`/alertas/ObterKPI_2/${idEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        console.log(resposta);
        if (resposta.ok) {

            resposta.json().then(jsonKPI_2 => {
                if (jsonKPI_2.length > 0 || jsonKPI_2.Numeracao) {
                    console.log(jsonKPI_2);
                    console.log(JSON.stringify(jsonKPI_2));
                    dado_kpi_2.innerText = `ATM${jsonKPI_2.Numeracao}`;

                    // Obtendo qtd critica

                    fetch(`/alertas/ObterKPI_2_qtdCritico/${idEmpresa}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (resposta) {
                        if (resposta.ok) {
                            console.log(resposta);

                            resposta.json().then(jsonKPI_2_qtdCritico => {
                                console.log(jsonKPI_2_qtdCritico);
                                console.log(JSON.stringify(jsonKPI_2_qtdCritico));
                                spn_kpi_2_critico.innerText = jsonKPI_2_qtdCritico.TotalAlertaCritico;
                            });


                        } else {
                            console.log("Houve um erro ao tentar obter a KPI 2");
                            resposta.text().then(texto => {
                                console.error(texto);

                            });
                        }

                    }).catch(function (erro) {
                        console.log(erro);
                    })

                    // Obtendo qtd moderada

                    fetch(`/alertas/ObterKPI_2_qtdModerado/${idEmpresa}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function (resposta) {
                        if (resposta.ok) {
                            console.log(resposta);

                            resposta.json().then(jsonKPI_2_qtdModerado => {
                                console.log(jsonKPI_2_qtdModerado);
                                console.log(JSON.stringify(jsonKPI_2_qtdModerado));
                                spn_kpi_2_moderado.innerText = jsonKPI_2_qtdModerado.TotalAlertaModerado;
                            });


                        } else {
                            console.log("Houve um erro ao tentar obter a KPI 2");
                            resposta.text().then(texto => {
                                console.error(texto);

                            });
                        }

                    }).catch(function (erro) {
                        console.log(erro);
                    })

                }
                else {
                    dado_kpi_2.innerText = "N/D"
                }
            });

        } else {
            console.log("Houve um erro ao tentar obter a KPI 2");
            resposta.text().then(texto => {
                console.error(texto);

            });
        }



    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function ObterKPI_3() {

    const dado_kpi_3 = document.getElementById('h2_kpi_3')
    const spn_kpi_3_critico = document.getElementById('spn_kpi_3_critico')
    const spn_kpi_3_moderado = document.getElementById('spn_kpi_3_moderado')

    fetch(`/alertas/ObterKPI_3/${idEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        console.log(resposta);

        if (resposta.ok) {

            resposta.json().then(jsonKPI_3 => {
                console.log(jsonKPI_3);
                console.log(JSON.stringify(jsonKPI_3));
                dado_kpi_3.innerText = jsonKPI_3.TotalResolvido;
            })


            // Obtendo qtd critica

            fetch(`/alertas/ObterKPI_3_qtdCritico/${idEmpresa}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {
                if (resposta.ok) {
                    console.log(resposta);

                    resposta.json().then(jsonKPI_3_qtdCritico => {
                        console.log(jsonKPI_3_qtdCritico);
                        console.log(JSON.stringify(jsonKPI_3_qtdCritico));
                        spn_kpi_3_critico.innerText = jsonKPI_3_qtdCritico.TotalResolvidoCritico;
                    });

                } else {
                    console.log("Houve um erro ao tentar obter a KPI 2");
                    resposta.text().then(texto => {
                        console.error(texto);

                    });
                }

            }).catch(function (erro) {
                console.log(erro);
            })

            // Obtendo qtd moderada

            fetch(`/alertas/ObterKPI_3_qtdModerado/${idEmpresa}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {
                if (resposta.ok) {
                    console.log(resposta);

                    resposta.json().then(jsonKPI_3_qtdModerado => {
                        console.log(jsonKPI_3_qtdModerado);
                        console.log(JSON.stringify(jsonKPI_3_qtdModerado));
                        spn_kpi_3_moderado.innerText = jsonKPI_3_qtdModerado.TotalResolvidoModerado;
                    });

                } else {
                    console.log("Houve um erro ao tentar obter a KPI 2");
                    resposta.text().then(texto => {
                        console.error(texto);

                    });
                }

            }).catch(function (erro) {
                console.log(erro);
            })

        } else {
            console.log("Houve um erro ao tentar obter a KPI 3");
            resposta.text().then(texto => {
                console.error(texto);

            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function ObterGrafico_Pizza() {
    const box_grafico3_sem_dados = document.getElementById('box_grafico3_sem_dados')

    var moderados = Number(totalPendentesModerados);
    var criticos = Number(totalPendentesCriticos);

    if (moderados === 0 && criticos === 0) {
        box_grafico3_sem_dados.classList.remove('d-none')
        grafico3.classList.add('d-none')
    } else {
        box_grafico3_sem_dados.classList.add('d-none')
        grafico3.classList.remove('d-none')
        chart_grafico3.updateSeries([moderados, criticos]);
    }
}

function ObterGrafico_Bar() {

    fetch(`/alertas/Grafico_Bar/${idEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(jsonGrafico_Bar => {

                console.log("Dados recebidos: ", jsonGrafico_Bar);

                const dadosPendentes = [
                    Number(jsonGrafico_Bar.PendentesAlertaRede),
                    Number(jsonGrafico_Bar.PendentesAlertaDisco),
                    Number(jsonGrafico_Bar.PendentesAlertaRAM),
                    Number(jsonGrafico_Bar.PendentesAlertaCPU)
                ];

                const dadosResolvidos = [
                    Number(jsonGrafico_Bar.ResolvidosAlertaRede),
                    Number(jsonGrafico_Bar.ResolvidosAlertaDisco),
                    Number(jsonGrafico_Bar.ResolvidosAlertaRAM),
                    Number(jsonGrafico_Bar.ResolvidosAlertaCPU)
                ];

                const dadosTotais = [
                    Number(jsonGrafico_Bar.TotalAlertaRede),
                    Number(jsonGrafico_Bar.TotalAlertaDisco),
                    Number(jsonGrafico_Bar.TotalAlertaRAM),
                    Number(jsonGrafico_Bar.TotalAlertaCPU)
                ];

                chart_grafico1.updateSeries([
                    { name: 'Pendentes', data: dadosPendentes },
                    { name: 'Resolvidos', data: dadosResolvidos },
                    { name: 'Total', data: dadosTotais }
                ]);

            });
        } else {
            console.error("Erro na resposta da API");
        }
    });
}

function ObterHistorico() {
    const span_metricas_criticos = document.getElementById('span_metricas_criticos')
    const span_metricas_moderados = document.getElementById('span_metricas_moderados')
    const span_metricas_total = document.getElementById('span_metricas_total')

    fetch(`/alertas/ObterHistorico/${idEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(jsonHistorico => {
                span_metricas_criticos.innerText = jsonHistorico.QtdCriticos;
                span_metricas_moderados.innerText = jsonHistorico.QtdModerados;
                span_metricas_total.innerHTML = `<b>${jsonHistorico.TotalAlertas}</b>`;
            });
        } else {
            console.error("Erro na resposta da API");
        }
    });
}

function ObterHistoricoATM() {
    var container = document.getElementById("box_gerenciar_atms");
    fetch(`/alertas/ObterHistoricoATM/${idEmpresa}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (listaAlertas) {
                    if (listaAlertas.length === 0) {
                        container.innerHTML = `<div id="box_sem_atm">
                            <div id="box_img_sem_atm">
                                <img src="../../../Assets/Elements/Icons/check_progresso.png" id="img_sem_atm">
                                <span id="spn_sem_atm">Você não possui nenhum alerta!</span>
                            </div>
                        </div>`;
                    }
                    else {

                        plotarCards(listaAlertas);
                    }
                });
            } else {
                console.error("Erro na resposta da API");
            }
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

function plotarCards(listaAlertas) {
    var container = document.getElementById("box_gerenciar_atms");

    container.innerHTML = "";

    listaAlertas.forEach(alerta => {

        var classeCriticidade = alerta.NivelCriticidade === "Crítico"
            ? "status_critico"
            : "status_moderado";

        var classeStatus, classeBtn, textoBtn, strData;

        if (alerta.StatusAlerta === "Pendente") {
            classeStatus = "status_pendente";
            classeBtn = "btn_resolvido";
            textoBtn = "Marcar como resolvido";
            strData = `<b>Data de emissão:</b> ${alerta.DataOcorrencia}`
        } else {
            classeStatus = "status_resolvido";
            classeBtn = "btn_emAberto";
            textoBtn = "Marcar como pendente";
            strData = `<b>Data de resolução:</b> ${alerta.DataOcorrencia}`
        }

        var descricao = "";
        var valorFormatado = Number(alerta.ValorCaptura).toFixed(1);

        if (alerta.TipoComponente === "CPU") {
            descricao = `Processamento elevado - ${valorFormatado}%`;
        } else if (alerta.TipoComponente === "Memória RAM" || alerta.TipoComponente === "RAM") {
            descricao = `Consumo elevado - ${valorFormatado}%`;
        } else if (alerta.TipoComponente === "Disco") {
            descricao = `Uso de disco elevado - ${valorFormatado}%`;
        } else if (alerta.TipoComponente === "Rede" || alerta.TipoComponente === "Placa de rede") {
            descricao = `Sem conexão de internet`;
        } else {
            descricao = `Alerta de ${alerta.TipoComponente} - ${valorFormatado}`;
        }

        var numAtm = "ATM" + String(alerta.NumeracaoATM).padStart(2, '0');
        var cardHTML = `
        <div class="box_atm">
            <div class="container_titulo_atm">
                <span class="nome_atm">${numAtm}</span>
                <span class="nome_componente">${alerta.TipoComponente}</span>
                <span class="${classeCriticidade}">${alerta.NivelCriticidade}</span>
                <span class="${classeStatus}">${alerta.StatusAlerta}</span>
            </div>
            
            <span class="desc_atm">${descricao}</span>
            
            <div class="container_acao_alerta">
                <span class="dataHora_captura">${strData}</span>
                
                <button class="${classeBtn}" onclick="mudarStatus(${alerta.idAlerta})">${textoBtn}</button>
            </div>
        </div>
        `;
        container.innerHTML += cardHTML;
    });
}

function mudarStatus(idAlerta) {
    fetch(`/alertas/mudarStatus/${idAlerta}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            ObterHistoricoATM();
        } else {
            console.log("Houve um erro ao tentar mudar o status do alerta");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}

function obterDadosBoxplot() {
    fetch(`/alertas/obterDadosBoxplot/${idEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(dados => {
            chart_grafico2.updateSeries(dados.series);
        });
}