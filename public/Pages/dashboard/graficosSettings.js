combo_componentes.value = 'cpu';

let dados_cpu = [];
let dados_ram = [];
let dados_disco = [];
let dados_rede = [];
let horarios_captura = [];
let graficoDowntime = null;

function vwParaPx(vwValue) {
    const larguraViewport = window.innerWidth;
    const valorEmPx = (larguraViewport / 100) * vwValue;
    return Math.round(valorEmPx);
}

function trocarComponente() {
    if (combo_componentes.value == 'cpu') {
        chartLinha.updateSeries([
            {
                name: 'CPU',
                data: dados_cpu,
            },
        ]);
        chartLinha.updateOptions(
            {
                colors: ['#6ce5e8'],
                xaxis: {
                    categories: horarios_captura,
                },
                annotations: {
                    yaxis: [
                        {
                            y: sessionStorage.getItem('PARAM_CRITICO_CPU'),
                            borderColor: '#FF4560',
                            strokeDashArray: 0,
                        },
                        {
                            y: sessionStorage.getItem('PARAM_IMPORTANTE_CPU'),
                            borderColor: '#f4a261',
                            strokeDashArray: 0,
                        },
                    ],
                },
            },
            true,
            true,
            true
        );
    } else if (combo_componentes.value == 'ram') {
        chartLinha.updateSeries([
            {
                name: 'RAM',
                data: dados_ram,
            },
        ]);
        chartLinha.updateOptions(
            {
                colors: ['#41b8d5'],
                xaxis: {
                    categories: horarios_captura,
                },
                annotations: {
                    yaxis: [
                        {
                            y: sessionStorage.getItem('PARAM_CRITICO_RAM'),
                            borderColor: '#FF4560',
                            strokeDashArray: 0,
                        },
                        {
                            y: sessionStorage.getItem('PARAM_IMPORTANTE_RAM'),
                            borderColor: '#f4a261',
                            strokeDashArray: 0,
                        },
                    ],
                },
            },
            true,
            true,
            true
        );
    } else if (combo_componentes.value == 'disco') {
        chartLinha.updateSeries([
            {
                name: 'Disco',
                data: dados_disco,
            },
        ]);
        chartLinha.updateOptions(
            {
                colors: ['#1b5979'],
                xaxis: {
                    categories: horarios_captura,
                },
                annotations: {
                    yaxis: [
                        {
                            y: sessionStorage.getItem('PARAM_CRITICO_DISCO'),
                            borderColor: '#FF4560',
                            strokeDashArray: 0,
                        },
                        {
                            y: sessionStorage.getItem('PARAM_IMPORTANTE_DISCO'),
                            borderColor: '#f4a261',
                            strokeDashArray: 0,
                        },
                    ],
                },
            },
            true,
            true,
            true
        );
    }
}

function ultimasCapturas(idAtm) {
    return fetch(`/dashboard/ultimas-capturas/${idAtm}`, { cache: 'no-store' })
        .then(response => {
            if (response.ok) {
                return response.json().then(resposta => {
                    let kpiCpu = document.getElementById('dado-kpi-cpu');
                    let kpiRam = document.getElementById('dado-kpi-ram');
                    let kpiDisco = document.getElementById('dado-kpi-disco');

                    const corModerado = '#f4a261';
                    const corCritico = '#e63946';
                    const corOk = '#00bf35';

                    let statusKpiCpu = document.getElementById('status-cpu');
                    let statusKpiRAM = document.getElementById('status-ram');
                    let statusKpiDisco = document.getElementById('status-disco');

                    if (resposta.length > 0) {
                        resposta.reverse();
                        for (let i = 0; i < resposta.length; i++) {
                            switch (parseInt(resposta[i]['fkComponente'])) {
                                case 1:
                                    dados_cpu.push(resposta[i]['valor']);
                                    break;
                                case 2:
                                    dados_ram.push(resposta[i]['valor']);
                                    break;
                                case 3:
                                    dados_disco.push(resposta[i]['valor']);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }

                    if (dados_cpu.length > 0) {
                        let valorCpu = dados_cpu[dados_cpu.length - 1];
                        kpiCpu.innerHTML = valorCpu + '%';

                        if (valorCpu > sessionStorage.getItem('PARAM_CRITICO_CPU')) {
                            statusKpiCpu.innerHTML = 'Crítico';
                            statusKpiCpu.style.color = corCritico;
                        } else if (valorCpu > sessionStorage.getItem('PARAM_IMPORTANTE_CPU')) {
                            statusKpiCpu.innerHTML = 'Moderado';
                            statusKpiCpu.style.color = corModerado;
                        } else {
                            statusKpiCpu.innerHTML = 'Normal';
                            statusKpiCpu.style.color = corOk;
                        }
                    } else {
                        kpiCpu.innerHTML = 'N/D';
                        statusKpiCpu.innerHTML = 'Indisponível';
                        statusKpiCpu.style.color = corCritico;
                    }

                    if (dados_ram.length > 0) {
                        let valorRam = dados_ram[dados_ram.length - 1];
                        kpiRam.innerHTML = valorRam + '%';

                        if (valorRam > sessionStorage.getItem('PARAM_CRITICO_RAM')) {
                            statusKpiRAM.innerHTML = 'Crítico';
                            statusKpiRAM.style.color = corCritico;
                        } else if (valorRam > sessionStorage.getItem('PARAM_IMPORTANTE_RAM')) {
                            statusKpiRAM.innerHTML = 'Moderado';
                            statusKpiRAM.style.color = corModerado;
                        } else {
                            statusKpiRAM.innerHTML = 'Normal';
                            statusKpiRAM.style.color = corOk;
                        }
                    } else {
                        kpiRam.innerHTML = 'N/D';
                        statusKpiRAM.innerHTML = 'Indisponível';
                        statusKpiRAM.style.color = corCritico;
                    }

                    if (dados_disco.length > 0) {
                        let valorDisco = dados_disco[dados_disco.length - 1];
                        kpiDisco.innerHTML = valorDisco + '%';

                        if (valorDisco > sessionStorage.getItem('PARAM_CRITICO_DISCO')) {
                            statusKpiDisco.innerHTML = 'Crítico';
                            statusKpiDisco.style.color = corCritico;
                        } else if (valorDisco > sessionStorage.getItem('PARAM_IMPORTANTE_DISCO')) {
                            statusKpiDisco.innerHTML = 'Moderado';
                            statusKpiDisco.style.color = corModerado;
                        } else {
                            statusKpiDisco.innerHTML = 'Normal';
                            statusKpiDisco.style.color = corOk;
                        }
                    } else {
                        kpiDisco.innerHTML = 'N/D';
                        statusKpiDisco.innerHTML = 'Indisponível';
                        statusKpiDisco.style.color = corCritico;
                    }
                });
            } else {
                console.error('ultimasCapturas: nenhum dado encontrado ou erro na API');
                return Promise.reject('erro na API: ultimas capturas');
            }
        })
        .catch(erro => {
            console.error(`ultimasCapturas: erro na obtenção dos dados: ${erro.message}`);
            return Promise.reject(erro);
        });
}

function pegarUltimosHorariosCaptura(idAtm) {
    const formatarData = data => {
        const date = new Date(data);
        const hora = date.getHours().toString().padStart(2, '0');
        const minuto = date.getMinutes().toString().padStart(2, '0');
        const segundo = date.getSeconds().toString().padStart(2, '0');
        return `${hora}:${minuto}:${segundo}`;
    };

    return fetch(`/dashboard/ultimos-horarios/${idAtm}`, { cache: 'no-store' })
        .then(response => {
            if (response.ok) {
                return response.json().then(resposta => {
                    if (resposta.length > 0) {
                        resposta.reverse();
                        for (let i = 0; i < resposta.length; i++) {
                            horarios_captura.push(formatarData(resposta[i].horario));
                        }
                    }
                });
            } else {
                console.error('pegarUltimosHorariosCaptura: nenhum dado encontrado ou erro na API');
                return Promise.reject('erro na API: ultimosHorarios');
            }
        })
        .catch(erro => {
            console.error(
                `pegarUltimosHorariosCaptura: erro na obtenção dos dados: ${erro.message}`
            );
            return Promise.reject(erro);
        });
}

function carregarDowntime(idAtm) {
    fetch(`/dashboard/pegar-downtime/${idAtm}`, { cache: 'no-store' })
        .then(response => {
            if (response.ok) {
                response.json().then(resposta => {
                    if (resposta.length == 0) {
                        console.log('resposta downtime: ', resposta);
                        console.log('nenhuma captura encontrada nos últimos 7 dias.');
                    }

                    if (resposta.length == 1) {
                        console.log('apenas uma captura. não é possível calcular o downtime');
                    }
                    let downtime = [];
                    let totalDownTimeSeg = 0;

                    for (let i = 0; i < resposta.length - 1; i++) {
                        const t1 = new Date(resposta[i].horario);
                        const t2 = new Date(resposta[i + 1].horario);
                        const diffEmSegundos = (t2.getTime() - t1.getTime()) / 1000;

                        if (diffEmSegundos > 12) {
                            totalDownTimeSeg += diffEmSegundos - 3;
                        }
                    }

                    const totalSegundosSemana = 7 * 24 * 60 * 60;
                    const totalUpTimeSeg = totalSegundosSemana - totalDownTimeSeg;

                    const totalUpTimePercent = (totalUpTimeSeg / totalSegundosSemana) * 100;
                    const totalDownTimePercent = (totalDownTimeSeg / totalSegundosSemana) * 100;

                    downtime[0] = Number(totalUpTimePercent.toFixed(2));
                    downtime[1] = Number(totalDownTimePercent.toFixed(2));

                    if (graficoDowntime == null) {
                        var options = {
                            series: downtime,
                            labels: ['UPTIME', 'DOWNTIME'],
                            legend: {
                                position: 'top',
                            },
                            chart: {
                                type: 'donut',
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
                            },
                            dataLabels: {
                                enabled: true,
                                style: {
                                    fontSize: `${vwParaPx(1)}px`,
                                    fontFamily: 'poppins leve',
                                    colors: ['#fff'],
                                },
                            },
                            responsive: [
                                {
                                    breakpoint: 480,
                                    options: {
                                        chart: {
                                            width: 400,
                                        },
                                        legend: {
                                            position: 'bottom',
                                            fontSize: `${vwParaPx(1)}px`,
                                            fontFamily: 'poppins leve',
                                        },
                                    },
                                },
                            ],
                            tooltip: {
                                enabled: true,
                                y: {
                                    formatter: function (val) {
                                        return val + '%';
                                    },
                                    title: {
                                        formatter: function (seriesName) {
                                            return seriesName;
                                        },
                                    },
                                },
                                theme: 'light',
                                style: {
                                    fontSize: `${vwParaPx(0.8)}px`,
                                    fontFamily: 'poppins leve',
                                },
                            },
                            legend: {
                                position: 'top',
                                fontSize: `${vwParaPx(1)}px`,
                                fontFamily: 'poppins leve',
                                color: '#000',
                            },
                            plotOptions: {
                                pie: {
                                    donut: {
                                        size: '50%',
                                    },
                                },
                            },
                            colors: ['#6ce5e8', '#41b8d5'],
                        };

                        graficoDowntime = new ApexCharts(
                            document.querySelector('#torta_baixo'),
                            options
                        );
                        graficoDowntime.render();
                    } else {
                        graficoDowntime.updateSeries(downtime);
                    }
                });
            } else {
                console.error('carregarDowntime: nenhum dado encontrado ou erro na API');
            }
        })
        .catch(erro => {
            console.error(`carregarDowntime: erro na obtenção dos dados: ${erro.message}`);
        });
}

var optionsComponentes = {
    series: [
        {
            name: 'CPU',
            data: dados_cpu,
        },
    ],
    legend: {
        position: 'top',
        fontSize: `${vwParaPx(1)}px`,
        fontFamily: 'poppins leve',
        markers: {
            size: `${vwParaPx(0.4)}`,
        },
    },
    chart: {
        height: '90%',
        width: '100%',
        type: 'line',
        zoom: {
            enabled: false,
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
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'straight',
        width: `${vwParaPx(0.2)}`,
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
        },
    },
    colors: ['#6ce5e8'],
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
                y: 37.83,
                borderColor: '#FF4560',
                strokeDashArray: 0,
            },
            {
                y: 31.23,
                borderColor: '#f4a261',
                strokeDashArray: 0,
            },
        ],
    },
    xaxis: {
        categories: horarios_captura,
        labels: {
            style: {
                fontSize: `${vwParaPx(0.8)}px`,
                fontFamily: 'poppins leve',
            },
        },
    },
};

var chartLinha = new ApexCharts(document.querySelector('#caixagraflinha'), optionsComponentes);
chartLinha.render();

window.addEventListener('resize', function () {
    window.location.reload(true);
});

function atualizarGrafico(idAtm) {
    dados_cpu = [];
    dados_ram = [];
    dados_disco = [];
    horarios_captura = [];

    Promise.all([ultimasCapturas(idAtm), pegarUltimosHorariosCaptura(idAtm)])
        .then(() => {
            trocarComponente();
        })
        .catch(erro => {
            console.error('Erro ao atualizar grafico de linha: ', erro);
        });
}

let intervalId = null;
let comboATMs = document.getElementById('comboATMs');

function atualizarDashboard() {
    let idAtm = comboATMs.value;
    atualizarGrafico(idAtm);
    carregarDowntime(idAtm);
}

window.addEventListener('DOMContentLoaded', () => {
    atualizarDashboard();
    intervalId = setInterval(atualizarDashboard, 3500);

    comboATMs.addEventListener('change', () => {
        clearInterval(intervalId);
        atualizarDashboard();
        intervalId = setInterval(atualizarDashboard, 3500);
    });
});
