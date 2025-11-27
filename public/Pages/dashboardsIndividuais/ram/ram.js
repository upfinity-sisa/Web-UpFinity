document.addEventListener('DOMContentLoaded', () => {

    const kpiUsoMedio = document.getElementById("kpi-uso-medio")
    const kpiQtdAlerta = document.getElementById("kpi-qtd-alertas")
    const kpiHorarioMaior = document.getElementById("kpi-horario-maior")
    const grafUsoAtual = document.getElementById("grafico-uso-atual")
    const grafMaiorHr = document.getElementById("grafico-maior-horario")
    let idEmpresa = sessionStorage.getItem("FK_EMPRESA");

    function ObterKPI_1() {
        fetch(`/ram/ObterKPI_1/${idEmpresa}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(jsonKPI1 => {
                    console.log(jsonKPI1);
                    kpiUsoMedio.innerText = `${jsonKPI1.usoMedio.toFixed(2)} %`;
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
    }

    function ObterKPI_2() {
        fetch(`/ram/ObterKPI_2/${idEmpresa}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(jsonKPI2 => {
                    console.log(jsonKPI2);
                    kpiQtdAlerta.innerText = jsonKPI2.qtdAlerta;
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

    function ObterKPI_3() {
        fetch(`/ram/ObterKPI_3/${idEmpresa}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(jsonKPI3 => {
                    console.log(jsonKPI3);
                    kpiHorarioMaior.innerText = jsonKPI3.qtdHorario;
                });


            } else {
                console.log("Houve um erro ao tentar obter a KPI 3");
                resposta.text().then(texto => {
                    console.error(texto);

                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })
    }

    function carregarDados() {
        ObterKPI_1();
        ObterKPI_2();
        ObterKPI_3();
        CarregarDadosGraficoUsoAtual();
        // CarregarDadosGraficoDeUso();
    }

    window.onload = function () {
        carregarDados();
    }

    setInterval(carregarDados, 2000);

    var optionsGraficoUsoAtual = {
        chart: {
            type: 'line'
        },
        series: [{
            name: 'sales',
            data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        }],
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
    }
    const graficoUsoAtual = document.getElementById('grafico-uso-atual')
    var chartUsoAtual = new ApexCharts(graficoUsoAtual, optionsGraficoUsoAtual);

    chartUsoAtual.render();

    function CarregarDadosGraficoUsoAtual() {
        fetch(`/ram/CarregarDadosGraficoUsoAtual/${idEmpresa}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(dados => {
                console.log("Dados recebidos UsoAtual:", dados);

                // Extrair valores e horários e inverter a ordem
                const valores = dados.grafUsoAtual.map(item => item.usoAtualRam).reverse();
                const horarios = dados.grafUsoAtual.map(item => item.horario).reverse();

                // Atualizar o gráfico com valores e categorias
                chartUsoAtual.updateOptions({
                    xaxis: {
                        categories: horarios,
                        title: {
                            text: 'horario',
                            offsetY: -10,
                            offsetX: 0,
                            style: {
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#000000ff'
                            }
                        }
                    },
                    yaxis: {
                        title: {
                            text: 'Uso da RAM (%)',
                            style: {
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#333'
                            }
                        }
                    }
                });

                chartUsoAtual.updateSeries([
                    {
                        name: 'Uso Atual RAM',
                        data: valores
                    }
                ]);

                // Atualizar a barra de progresso com o último valor (agora o mais recente está no final)
                if (valores.length > 0) {
                    const ultimoValor = valores[valores.length - 1];
                    updateProgressBar(ultimoValor);
                }
            }).catch(function (erro) {
                console.log(erro);
            });
    }

    var optionsGraficoProgresao = {
        series: [{
            data: [400, 430, 448]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Normal', 'Moderado', 'Critico'
            ],
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), optionsGraficoProgresao);
    chart.render();

    function CarregarDadosGraficoDeUso() {
        fetch(`/ram/CarregarDadosGraficoDeUso/${idEmpresa}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(dados => {
                console.log("Dados recebidos GraficoDeUso:", dados);
                // grafMaiorHr.updateSeries(dados.series);
                chart.updateSeries(dados.series);
            }).catch(function (erro) {
                console.log(erro);
            });
    }
});

const URL_BASE_API = "http://localhost:3333/ram";

function updateProgressBar(percentage) {
    const progressBar = document.getElementById('progressBar');
    const progressValue = document.getElementById('progressValue');

    if (!progressBar || !progressValue) return;

    const limitedPercentage = Math.min(100, Math.max(0, percentage));

    progressBar.style.width = `${limitedPercentage}%`;
    progressValue.textContent = `${limitedPercentage.toFixed(1)}%`;

    progressBar.classList.remove('verde', 'amarelo', 'vermelho');

    if (limitedPercentage <= 69) {
        progressBar.classList.add('verde');
    } else if (limitedPercentage <= 85) {
        progressBar.classList.add('amarelo');
    } else {
        progressBar.classList.add('vermelho');
    }
};
