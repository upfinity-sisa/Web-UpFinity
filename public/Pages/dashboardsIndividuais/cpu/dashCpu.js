let dados_uso = [];
let horarios_uso = [];
let dados_temperatura = [];
let horarios_temperatura = [];
let dados_frequencia = [];
let graficoLinha = null;
let graficoTemperatura = null;
let graficoRelacao = null;
let graficoMaioresUsos1 = null;
let graficoMaioresUsos2 = null;
let graficoMaioresUsos3 = null;
let comboATMSCPU = document.getElementById('comboATMs');

function vwParaPx(vwValue) {
    const larguraViewport = window.innerWidth;
    const valorEmPx = (larguraViewport / 100) * vwValue;
    return Math.round(valorEmPx);
}

function carregarDadosCPU(idAtm) {
    dados_uso = [];
    horarios_uso = [];
    dados_temperatura = [];
    horarios_temperatura = [];
    dados_frequencia = [];
    fetch(`/cpu/dados/${idAtm}`, { cache: 'no-store' })
        .then(response => {
            if (response.ok) {
                response.json().then(resposta => {
                    let kpiUso = document.getElementById('uso-data');
                    let kpiTemperatura = document.getElementById('temperatura-data');
                    let kpiFrequencia = document.getElementById('frequencia-data');

                    let statusUso = document.getElementById('status-uso');
                    let statusTemperatura = document.getElementById('status-temperatura');
                    let statusFrequencia = document.getElementById('status-frequencia');

                    const corModerado = '#f4a261';
                    const corCritico = '#e63946';
                    const corOk = '#00bf35';

                    resposta.reverse();
                    if (resposta.length > 0) {
                        const formatarHorario = horario => {
                            let data = new Date(horario);
                            let horas = data.getHours().toString().padStart(2, '0');
                            let minutos = data.getMinutes().toString().padStart(2, '0');
                            let segundos = data.getSeconds().toString().padStart(2, '0');
                            return `${horas}:${minutos}:${segundos}`;
                        };

                        for (let i = 0; i < resposta.length; i++) {
                            switch (parseInt(resposta[i].fkComponente)) {
                                case 1:
                                    dados_uso.push(resposta[i].valor);
                                    horarios_uso.push(formatarHorario(resposta[i].horario));
                                    break;
                                case 5:
                                    dados_temperatura.push(resposta[i].valor);
                                    horarios_temperatura.push(formatarHorario(resposta[i].horario));
                                    break;
                                case 6:
                                    dados_frequencia.push(resposta[i].valor);
                                    break;
                                default:
                                    break;
                            }
                        }

                        let valorUso = parseFloat(dados_uso[dados_uso.length - 1]).toFixed(2);
                        let valorTemperatura = parseFloat(
                            dados_temperatura[dados_temperatura.length - 1]
                        ).toFixed(2);
                        let valorFrequencia = parseFloat(
                            dados_frequencia[dados_frequencia.length - 1]
                        ).toFixed(2);

                        kpiUso.innerHTML = valorUso + '%';
                        kpiTemperatura.innerHTML = valorTemperatura + 'ºC';
                        kpiFrequencia.innerHTML = valorFrequencia + 'MHz';

                        if (valorUso > sessionStorage.getItem('PARAM_CRITICO_CPU')) {
                            statusUso.innerHTML = 'Crítico';
                            statusUso.style.color = corCritico;
                        } else if (valorUso > sessionStorage.getItem('PARAM_IMPORTANTE_CPU')) {
                            statusUso.innerHTML = 'Importante';
                            statusUso.style.color = corModerado;
                        } else {
                            statusUso.innerHTML = 'Normal';
                            statusUso.style.color = corOk;
                        }

                        if (valorTemperatura > sessionStorage.getItem('PARAM_CRITICO_TEMPERATURA_CPU')) {
                            statusTemperatura.innerHTML = 'Crítico';
                            statusTemperatura.style.color = corCritico;
                        } else if (
                            valorTemperatura > sessionStorage.getItem('PARAM_IMPORTANTE_TEMPERATURA_CPU')
                        ) {
                            statusTemperatura.innerHTML = 'Importante';
                            statusTemperatura.style.color = corModerado;
                        } else {
                            statusTemperatura.innerHTML = 'Normal';
                            statusTemperatura.style.color = corOk;
                        }

                        plotarGraficoLinha();
                        plotarGraficoTemperatura();
                        plotarGraficoRelacao();
                    }
                });
            } else {
                kpiUso.innerHTML = 'N/D';
                kpiTemperatura.innerHTML = 'N/D';
                kpiFrequencia.innerHTML = 'N/D';
                console.error('carregarDadosCPU: nenhum dado encontrado ou erro na API');
            }
        })
        .catch(erro => {
            console.error(`carregarDadosCpu: erro na obtenção de dados: ${erro.message}`);
        });

    fetch(`/cpu/maioresUsos/${sessionStorage.getItem('FK_EMPRESA')}`, {
        cache: 'no-store',
    })
        .then(response => {
            if (response.ok) {
                response.json().then(resposta => {
                    if (resposta.length > 0) {
                        plotarGraficoMaioresUsos(resposta);
                    } else {
                        console.error(
                            'carregarDadosCPU (maioresUsos): nenhum dado de maiores usos encontrado.'
                        );
                    }
                });
            } else {
                console.error('carregarDadosCPU (maioresUsos): erro ao buscar maiores usos na API');
            }
        })
        .catch(erro => {
            console.error(
                `carregarDadosCpu (maioresUsos): erro na obtenção de maiores usos: ${erro.message}`
            );
        });

    fetch(`/cpu/alertasHoje/${sessionStorage.getItem('FK_EMPRESA')}/${idAtm}`, {
        cache: 'no-store',
    })
        .then(response => {
            if (response.ok) {
                response.json().then(resposta => {
                    let kpiAlertasHoje = document.getElementById('qtdAlertas-data');
                    if (resposta.length > 0) {
                        kpiAlertasHoje.innerHTML = resposta[0].qtdAlertas;
                    } else {
                        kpiAlertasHoje.innerHTML = 'N/D';
                        console.error(
                            'carregarDadosCPU (alertasHoje): nenhum dado de alertas hoje encontrado.'
                        );
                    }
                });
            } else {
                console.error('carregarDadosCPU (alertasHoje): erro ao buscar alertas hoje na API');
            }
        })
        .catch(erro => {
            console.error(
                `carregarDadosCpu (alertasHoje): erro na obtenção de alertas hoje: ${erro.message}`
            );
        });
}

function carregarAtms() {
    fetch(`/dashboard/carregar-atms/${sessionStorage.getItem('FK_EMPRESA')}`, {
        cache: 'no-store',
    })
        .then(response => {
            if (response.ok) {
                response.json().then(resposta => {
                    if (resposta.length > 0) {
                        comboATMSCPU.innerHTML = '';
                        for (let i = 0; i < resposta.length; i++) {
                            comboATMSCPU.innerHTML += `
                        <option value="${resposta[i].numeracao}">ATM ${resposta[i].numeracao}</option>
                        `;
                        }
                        atualizarDadosCpu();
                    } else {
                        console.error('carregarAtms: nenhum parâmetro encontrado.');
                    }
                });
            } else {
                console.error('carregarAtms: nenhum dado encontrado ou erro na API');
            }
        })
        .catch(erro => {
            console.error(`carregarAtms: erro na obtenção dos dados: ${erro.message}`);
        });
}

function atualizarDadosCpu() {
    let idAtm = comboATMSCPU.value;
    carregarDadosCPU(idAtm);
}

function atualizarParametrosKpis() {
    let parametroCriticoUsoDiv = document.getElementById('critico-uso');
    let parametroModeradoUsoDiv = document.getElementById('moderado-uso');

    let parametroCriticoTemperaturaDiv = document.getElementById('critico-temperatura');
    let parametroModeradoTemperaturaDiv = document.getElementById('moderado-temperatura');

    parametroCriticoUsoDiv.innerHTML = parseFloat(sessionStorage.getItem('PARAM_CRITICO_CPU')).toFixed(2);
    parametroModeradoUsoDiv.innerHTML = parseFloat(sessionStorage.getItem('PARAM_IMPORTANTE_CPU')).toFixed(2);

    parametroCriticoTemperaturaDiv.innerHTML = parseFloat(sessionStorage.getItem('PARAM_CRITICO_TEMPERATURA_CPU')).toFixed(2);
    parametroModeradoTemperaturaDiv.innerHTML = parseFloat(sessionStorage.getItem('PARAM_IMPORTANTE_TEMPERATURA_CPU')).toFixed(2);
}

function plotarGraficoLinha() {
    if (graficoLinha == null) {
        var options = {
            series: [
                {
                    name: 'Uso',
                    data: dados_uso,
                },
            ],
            chart: {
                height: 300,
                type: 'line',
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                width: `${vwParaPx(0.2)}`,
            },
            title: {
                align: 'left',
            },
            xaxis: {
                categories: horarios_uso,
            },
            legend: {
                position: 'top',
                fontSize: `${vwParaPx(1)}px`,
                fontFamily: 'poppins leve',
                markers: {
                    size: `${vwParaPx(0.4)}`,
                },
            },
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                },
                offsetX: 0,
                offsetY: 0,
            },
            colors: ['#2ed1d7'],
            yaxis: {
                min: 0,
                max: 100,
                labels: {
                    style: {
                        fontSize: `${vwParaPx(0.8)}px`,
                        fontFamily: 'poppins leve',
                    },
                },
            },
            annotations: {
                yaxis: [
                    {
                        y: parseFloat(sessionStorage.getItem('PARAM_CRITICO_CPU')),
                        borderColor: '#FF4560',
                        strokeDashArray: 0,
                        label: {
                            borderColor: '#FF4560',
                            style: {
                                color: '#fff',
                                background: '#FF4560',
                            },
                            text: 'Crítico',
                        },
                    },
                    {
                        y: parseFloat(sessionStorage.getItem('PARAM_IMPORTANTE_CPU')),
                        borderColor: '#f4a261',
                        strokeDashArray: 0,
                        label: {
                            borderColor: '#f4a261',
                            style: {
                                color: '#fff',
                                background: '#f4a261',
                            },
                            text: 'Importante',
                        },
                    },
                ],
            },
        };

        graficoLinha = new ApexCharts(document.getElementById('grafico-linha'), options);
        graficoLinha.render();
    } else {
        graficoLinha.updateOptions({
            series: [
                {
                    name: 'Uso',
                    data: dados_uso,
                },
            ],
            xaxis: {
                categories: horarios_uso,
            },
        });
    }
}

function plotarGraficoTemperatura() {
    if (graficoTemperatura == null) {
        var options = {
            series: [
                {
                    name: 'Temperatura',
                    data: dados_temperatura,
                },
            ],
            chart: {
                height: 300,
                type: 'bar',
                zoom: {
                    enabled: false,
                },
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 0,
            },
            title: {
                align: 'left',
            },
            xaxis: {
                categories: horarios_temperatura,
            },
            legend: {
                position: 'top',
                fontSize: `${vwParaPx(1)}px`,
                fontFamily: 'poppins leve',
                markers: {
                    size: `${vwParaPx(0.4)}`,
                },
            },
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                },
                offsetX: 0,
                offsetY: 0,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    inverseColors: false,
                    stops: [0, 100],
                },
            },
            yaxis: {
                min: 0,
                max: 100,
                labels: {
                    style: {
                        fontSize: `${vwParaPx(0.8)}px`,
                        fontFamily: 'poppins leve',
                    },
                },
            },
            annotations: {
                yaxis: [
                    {
                        y: parseFloat(sessionStorage.getItem('PARAM_CRITICO_TEMPERATURA_CPU')),
                        borderColor: '#FF4560',
                        strokeDashArray: 0,
                        label: {
                            borderColor: '#FF4560',
                            style: {
                                color: '#fff',
                                background: '#FF4560',
                            },
                            text: 'Crítico',
                        },
                    },
                    {
                        y: parseFloat(sessionStorage.getItem('PARAM_IMPORTANTE_TEMPERATURA_CPU')),
                        borderColor: '#f4a261',
                        strokeDashArray: 0,
                        label: {
                            borderColor: '#f4a261',
                            style: {
                                color: '#fff',
                                background: '#f4a261',
                            },
                            text: 'Importante',
                        },
                    },
                ],
            },
        };

        graficoTemperatura = new ApexCharts(document.getElementById('grafico-linha-temperatura'), options);
        graficoTemperatura.render();
    } else {
        graficoTemperatura.updateOptions({
            series: [
                {
                    name: 'Temperatura',
                    data: dados_temperatura,
                },
            ],
            xaxis: {
                categories: horarios_temperatura,
            },
        });
    }
}

function plotarGraficoRelacao() {
    if (graficoRelacao == null) {
        var options = {
            series: [
                {
                    name: 'Temperatura',
                    data: dados_temperatura,
                },
                {
                    name: 'Uso',
                    data: dados_uso,
                },
            ],
            chart: {
                height: 300,
                type: 'line',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000,
                    },
                },
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                width: `${vwParaPx(0.2)}`,
            },
            title: {
                align: 'left',
            },
            xaxis: {
                categories: horarios_uso,
            },
            legend: {
                position: 'top',
                fontSize: `${vwParaPx(1)}px`,
                fontFamily: 'poppins leve',
                markers: {
                    size: `${vwParaPx(0.4)}`,
                },
            },
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                },
                offsetX: 0,
                offsetY: 0,
            },
            colors: ['#268184', '#2ed1d7'],
            yaxis: {
                min: 0,
                max: 100,
                labels: {
                    style: {
                        fontSize: `${vwParaPx(0.8)}px`,
                        fontFamily: 'poppins leve',
                    },
                },
            },
        };

        graficoRelacao = new ApexCharts(document.getElementById('grafico-relacao'), options);
        graficoRelacao.render();
    } else {
        graficoRelacao.updateOptions({
            series: [
                {
                    name: 'Temperatura',
                    data: dados_temperatura,
                },
                {
                    name: 'Uso',
                    data: dados_uso,
                },
            ],
            xaxis: {
                categories: horarios_uso,
            },
        });
    }
}

function plotarGraficoMaioresUsos(resposta) {
    let numeracoesAtms = [
        `ATM ${resposta[0].NumeroATM}`,
        `ATM ${resposta[1].NumeroATM}`,
        `ATM ${resposta[2].NumeroATM}`,
    ];
    let dados = {
        [numeracoesAtms[0]]: resposta[0].UsoCPU_Atual,
        [numeracoesAtms[1]]: resposta[1].UsoCPU_Atual,
        [numeracoesAtms[2]]: resposta[2].UsoCPU_Atual,
    };

    let dadosOrdenados = Object.entries(dados).sort((a, b) => b[1] - a[1]);

    if (graficoMaioresUsos1 == null && graficoMaioresUsos2 == null && graficoMaioresUsos3 == null) {
        let optionsBarra1 = {
            chart: {
                height: 70,
                type: 'bar',
                stacked: true,
                sparkline: {
                    enabled: true,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: '20%',
                    colors: {
                        backgroundBarColors: ['#40475D'],
                    },
                },
            },
            stroke: {
                width: 0,
            },
            series: [
                {
                    name: dadosOrdenados[0][0],
                    data: [dadosOrdenados[0][1]],
                },
            ],
            title: {
                floating: true,
                offsetX: -10,
                offsetY: 5,
                text: dadosOrdenados[0][0],
            },
            subtitle: {
                floating: true,
                align: 'right',
                offsetY: 0,
                text: `${dadosOrdenados[0][1]}%`,
                style: {
                    fontSize: '20px',
                },
            },
            tooltip: {
                enabled: false,
            },
            xaxis: {
                categories: [dadosOrdenados[0][0]],
            },
            yaxis: {
                max: 100,
            },
            fill: {
                opacity: 1,
            },
        };

        let optionsBarra2 = {
            chart: {
                height: 70,
                type: 'bar',
                stacked: true,
                sparkline: {
                    enabled: true,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: '20%',
                    colors: {
                        backgroundBarColors: ['#40475D'],
                    },
                },
            },
            stroke: {
                width: 0,
            },
            series: [
                {
                    name: dadosOrdenados[1][0],
                    data: [dadosOrdenados[1][1]],
                },
            ],
            title: {
                floating: true,
                offsetX: -10,
                offsetY: 5,
                text: dadosOrdenados[1][0],
            },
            subtitle: {
                floating: true,
                align: 'right',
                offsetY: 0,
                text: `${dadosOrdenados[1][1]}%`,
                style: {
                    fontSize: '20px',
                },
            },
            tooltip: {
                enabled: false,
            },
            xaxis: {
                categories: [dadosOrdenados[1][0]],
            },
            yaxis: {
                max: 100,
            },
            fill: {
                opacity: 1,
            },
            colors: ['#6078ea'],
        };

        let optionsBarra3 = {
            chart: {
                height: 70,
                type: 'bar',
                stacked: true,
                sparkline: {
                    enabled: true,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: '20%',
                    colors: {
                        backgroundBarColors: ['#40475D'],
                    },
                },
            },
            stroke: {
                width: 0,
            },
            series: [
                {
                    name: dadosOrdenados[2][0],
                    data: [dadosOrdenados[2][1]],
                },
            ],
            title: {
                floating: true,
                offsetX: -10,
                offsetY: 5,
                text: dadosOrdenados[2][0],
            },
            subtitle: {
                floating: true,
                align: 'right',
                offsetY: 0,
                text: `${dadosOrdenados[2][1]}%`,
                style: {
                    fontSize: '20px',
                },
            },
            tooltip: {
                enabled: false,
            },
            xaxis: {
                categories: [dadosOrdenados[2][0]],
            },
            yaxis: {
                max: 100,
            },
            fill: {
                opacity: 1,
            },
            colors: ['#e94560'],
        };

        graficoMaioresUsos1 = new ApexCharts(document.getElementById('linha-grafico-1'), optionsBarra1);
        graficoMaioresUsos1.render();
        graficoMaioresUsos2 = new ApexCharts(document.getElementById('linha-grafico-2'), optionsBarra2);
        graficoMaioresUsos2.render();
        graficoMaioresUsos3 = new ApexCharts(document.getElementById('linha-grafico-3'), optionsBarra3);
        graficoMaioresUsos3.render();
    } else {
        graficoMaioresUsos1.updateOptions({
            series: [
                {
                    name: dadosOrdenados[0][0],
                    data: [dadosOrdenados[0][1]],
                },
            ],
            subtitle: {
                text: `${dadosOrdenados[0][1]}%`,
            },
        });
        graficoMaioresUsos2.updateOptions({
            series: [
                {
                    name: dadosOrdenados[1][0],
                    data: [dadosOrdenados[1][1]],
                },
            ],
            subtitle: {
                text: `${dadosOrdenados[1][1]}%`,
            },
        });
        graficoMaioresUsos3.updateOptions({
            series: [
                {
                    name: dadosOrdenados[2][0],
                    data: [dadosOrdenados[2][1]],
                },
            ],
            subtitle: {
                text: `${dadosOrdenados[2][1]}%`,
            },
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    carregarAtms();
    atualizarParametrosKpis();
    intervaloAtualizacao = setInterval(atualizarDadosCpu, 3500);

    comboATMSCPU.addEventListener('change', () => {
        clearInterval(intervaloAtualizacao);
        atualizarDadosCpu();
        intervaloAtualizacao = setInterval(atualizarDadosCpu, 3500);
    });
});
