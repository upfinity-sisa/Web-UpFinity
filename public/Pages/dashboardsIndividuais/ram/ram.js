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
    }

    window.onload = function () {
        carregarDados();
    }

    setInterval(carregarDados, 3000);

    var optionsGraficoUsoAtual = {
        chart: {
            type: 'line'
        },
        series: [{
            name: 'sales',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
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
        }).then(res => res.json())
            .then(dados => {
                grafUsoAtual.updateSeries(dados.series);
            });
    }

var optionsGraficoProgresao = {
          series: [{
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
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
          categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            'United States', 'China', 'Germany'
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
                grafMaiorHr.updateSeries(dados.series);
            });
    }

    function carregarTodosDados() {
        buscarDadosRamTempoReal();
        CarregarDadosGraficoUsoAtual();
        CarregarDadosGraficoDeUso();
    }

    carregarTodosDados();
    setInterval(buscarDadosRamTempoReal, 2000);
});

   const URL_BASE_API = "http://localhost:3333/ram";