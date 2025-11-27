document.addEventListener('DOMContentLoaded', () => {

    const kpiUsoMedio = document.getElementById("kpi-uso-medio")
    const kpiQtdAlerta = document.getElementById("kpi-qtd-alertas")
    const kpiHorarioMaior = document.getElementById("kpi-horario-maior")
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
                chartUsoAtual.updateSeries(dados.series);
            });
    }



    let TOTAL_RAM = 0;
    let maquinaAtual = 1;
    const maxPontos = 15;
    let labels = Array(maxPontos).fill('');
    let dataRam = Array(maxPontos).fill(0);

    const URL_BASE_API = "http://localhost:3333/ram";

    function updateKPIsTempoReal(currentUsagePercent) {
        const kpiRamDisponivel = document.getElementById('kpi-ram-disponivel');

        if (kpiRamDisponivel && TOTAL_RAM > 0) {
            const ramUsadaGB = (TOTAL_RAM * (currentUsagePercent / 100));
            const ramLivreGB = TOTAL_RAM - ramUsadaGB;
            kpiRamDisponivel.textContent = `${ramLivreGB.toFixed(1)} GB`;
        }
    }

    async function buscarDadosRamTempoReal() {
        if (maquinaAtual == 0) return;

        try {
            const response = await fetch(`${URL_BASE_API}/dados-ram/${maquinaAtual}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const dados = await response.json();

            labels = dados.dadosGrafico.map(d => d.momento);
            dataRam = dados.dadosGrafico.map(d => d.valor);
            graficoRam.data.labels = labels;
            graficoRam.data.datasets[0].data = dataRam;
            graficoRam.update();

            const valorAtual = dataRam[dataRam.length - 1] || 0;

            updateProgressBar(valorAtual);
            updateKPIsTempoReal(valorAtual);

            document.getElementById('kpi-uso-medio').textContent = `${dados.usoMedioGB} GB`;
            document.getElementById('kpi-app-maior-uso').textContent = `${dados.nomeApp} (${dados.usoAppGB} GB)`;

        } catch (error) {
            console.error("Falha ao obter dados de RAM em tempo real:", error);
        }
    }

    async function buscarRamTotal() {
        try {
            const response = await fetch(`${URL_BASE_API}/ram-total/${maquinaAtual}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const dados = await response.json();
            TOTAL_RAM = dados.ramTotalGB || 16;
            console.log(`RAM Total definida como: ${TOTAL_RAM} GB`);

        } catch (error) {
            console.error("Falha ao obter RAM Total:", error);
            TOTAL_RAM = 16;
        }
    }

    async function buscarKPIsEstaticos() {
    }


    function carregarTodosDados() {
        dataRam.fill(0);
        labels.fill('');
        graficoRam.update();
        buscarRamTotal();
        buscarDadosRamTempoReal();
    }

    carregarTodosDados();
    setInterval(buscarDadosRamTempoReal, 2000);
});