
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
    colors: ['#c453f9', '#01ba01', '#00C6CC'],
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
                    y: [10, 15, 20, 25, 40]
                    // O outlier deve ser > 40
                },
                {
                    x: 'RAM',
                    y: [20, 30, 45, 55, 70]
                    // O outlier deve ser > 70
                },
                {
                    x: 'Disco',
                    y: [5, 10, 15, 20, 30]
                    // O outlier deve ser > 30
                },
                {
                    x: 'Rede',
                    y: [40, 50, 60, 80, 100]
                    // O outlier deve ser > 100
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
    colors: ['#00C6CC', '#f833b9ff'],
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
                upper: '#00C6CC',
                lower: '#008bccff'
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
    colors: ['#e8922f', '#ff3131'],

    dataLabels: {
        enabled: true,
        formatter: function (val) {
            return val.toFixed(1) + "%";
        },
        style: {
            fontSize: `${vwParaPx(1)}`,
            colors: ['#000000'],
            fontWeight: 300
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
    container_pai_gerenciar.classList.add('d-none')
})

btn_abrir_gerenciar.addEventListener('click', function () {
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
}

window.onload = function () {
    CarregarDadosDashboard()
};

setInterval(CarregarDadosDashboard, 3000);

let idEmpresa = sessionStorage.getItem('FK_EMPRESA');
console.log("id da empresa: " + fkEmpresa)

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
    var moderados = Number(totalPendentesModerados);
    var criticos = Number(totalPendentesCriticos);
    chart_grafico3.updateSeries([moderados, criticos]);
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