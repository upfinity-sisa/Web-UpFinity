function vwParaPx(vwValue) {
    const larguraViewport = window.innerWidth;
    const valorEmPx = (larguraViewport / 100) * vwValue;
    return Math.round(valorEmPx);
}

let dados_uso = [];
let horarios_uso = [];
let dados_temperatura = [];
let dados_frequencia = [];

function carregarDadosCPU(idAtm) {
    dados_uso = [];
    horarios_uso = [];
    dados_temperatura = [];
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
                            horarios_uso.push(formatarHorario(resposta[i].horario));
                            switch (parseInt(resposta[i].fkComponente)) {
                                case 1:
                                    dados_uso.push(resposta[i].valor);
                                    break;
                                case 5:
                                    dados_frequencia.push(resposta[i].valor);
                                    break;
                                case 6:
                                    dados_temperatura.push(resposta[i].valor);
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

                        if (
                            valorTemperatura >
                            sessionStorage.getItem('PARAM_CRITICO_TEMPERATURA_CPU')
                        ) {
                            statusTemperatura.innerHTML = 'Crítico';
                            statusTemperatura.style.color = corCritico;
                        } else if (
                            valorTemperatura >
                            sessionStorage.getItem('PARAM_IMPORTANTE_TEMPERATURA_CPU')
                        ) {
                            statusTemperatura.innerHTML = 'Importante';
                            statusTemperatura.style.color = corModerado;
                        } else {
                            statusTemperatura.innerHTML = 'Normal';
                            statusTemperatura.style.color = corOk;
                        }

                        plotarGraficoLinha();
                    }
                });
            } else {
                console.error('carregarDadosCPU: nenhum dado encontrado ou erro na API');
            }
        })
        .catch(erro => {
            console.error(`carregarDadosCpu: erro na obtenção de dados: ${erro.message}`);
        });
}

let comboATMSCPU = document.getElementById('comboATMs');
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

    parametroCriticoUsoDiv.innerHTML = parseFloat(
        sessionStorage.getItem('PARAM_CRITICO_CPU')
    ).toFixed(2);
    parametroModeradoUsoDiv.innerHTML = parseFloat(
        sessionStorage.getItem('PARAM_IMPORTANTE_CPU')
    ).toFixed(2);

    parametroCriticoTemperaturaDiv.innerHTML = parseFloat(
        sessionStorage.getItem('PARAM_CRITICO_TEMPERATURA_CPU')
    ).toFixed(2);
    parametroModeradoTemperaturaDiv.innerHTML = parseFloat(
        sessionStorage.getItem('PARAM_IMPORTANTE_TEMPERATURA_CPU')
    ).toFixed(2);
}

let graficoLinha = null;
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
                height: 400,
                type: 'line',
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'straight',
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
            colors: ['#268184'],
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

        graficoLinha = new ApexCharts(document.querySelector('#grafico-linha'), options);
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
