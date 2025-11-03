combo_componentes.value = "cpu";

var dados_cpu = [4.87, 29.45, 17.02, 8.66, 23.71, 12.34, 30.91, 29.9, 41.13]
var dados_ram = [3.42, 27.18, 45.07, 11.59, 32.66, 40.91, 50.12, 50.67, 52.01]
var dados_disco = [20.19, 39.82, 20.56, 45.24, 40.99, 30.07, 55.67, 50.24, 50.67]

function vwParaPx(vwValue) {
    const larguraViewport = window.innerWidth;
    const valorEmPx = (larguraViewport / 100) * vwValue;
    return Math.round(valorEmPx);
}

var options = {
    series: [{
        name: "CPU",
        data: dados_cpu
    }],
    legend: {
        position: 'top',
        fontSize: `${vwParaPx(1)}px`,
        fontFamily: 'poppins leve',
        markers: {
            size: `${vwParaPx(0.4)}`
        }
    },
    chart: {
        height: "90%",
        width: "100%",
        type: 'line',
        zoom: {
            enabled: false
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
                reset: false
            },
            offsetX: 0,
            offsetY: 0,
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight',
        width: `${vwParaPx(0.2)}`
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
        }
    },
    colors: ['#6ce5e8'],
    yaxis: {
        min: 0,
        max: 100,
        labels: {
            style: {
                fontSize: `${vwParaPx(0.8)}px`,
                fontFamily: 'poppins leve'
            }
        },
    },
    annotations: {
        yaxis: [{
            y: 37.83,
            borderColor: '#FF4560',
            strokeDashArray: 0,
        },
        {
            y: 31.23,
            borderColor: '#f4a261',
            strokeDashArray: 0
        }
        ]
    },
    xaxis: {
        categories: ['11:49:50', '11:49:53', '11:49:56', '11:49:59', '11:50:02', '11:50:05', '11:50:08', '11:50:11', '11:50:14'],
        labels: {
            style: {
                fontSize: `${vwParaPx(0.8)}px`,
                fontFamily: 'poppins leve'
            }
        }
    }
};

var chartLinha = new ApexCharts(document.querySelector("#caixagraflinha"), options);
chartLinha.render();

function trocarComponente() {
    if (combo_componentes.value == "cpu") {

        chartLinha.updateSeries([
            {
                name: "CPU",
                data: dados_cpu
            }
        ]);
        chartLinha.updateOptions({
            colors: ['#6ce5e8'],
            annotations: {
                yaxis: [{
                    y: 37.83,
                    borderColor: '#FF4560',
                    strokeDashArray: 0,
                },
                {
                    y: 31.23,
                    borderColor: '#f4a261',
                    strokeDashArray: 0,
                }]
            }
        }, true, true, true);


    } else if (combo_componentes.value == "ram") {

        chartLinha.updateSeries([
            {
                name: "RAM",
                data: dados_ram
            }
        ]);
        chartLinha.updateOptions({
            colors: ['#41b8d5'],
            annotations: {
                yaxis: [{
                    y: 52.46,
                    borderColor: '#FF4560',
                    strokeDashArray: 0,
                },
                {
                    y: 51.33,
                    borderColor: '#f4a261',
                    strokeDashArray: 0,
                }]
            }
        }, true, true, true);

    } else if (combo_componentes.value == "disco") {

        chartLinha.updateSeries([
            {
                name: "Disco",
                data: dados_disco
            }
        ]);
        chartLinha.updateOptions({
            colors: ['#1b5979'],
            annotations: {
                yaxis: [{
                    y: 59.50,
                    borderColor: '#FF4560',
                    strokeDashArray: 0,
                },
                {
                    y: 57.50,
                    borderColor: '#f4a261',
                    strokeDashArray: 0,
                }]
            }
        }, true, true, true);

    }
}

window.addEventListener('resize', function () {
    window.location.reload(true);
})

var options = {
    series: [85, 20],
    labels: ["UPTIME", "DOWNTIME"],
    legend: {
        position: 'top'
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
                reset: false
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
            colors: ['#fff']
        }
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 400
            },
            legend: {
                position: 'bottom',
                fontSize: `${vwParaPx(1)}px`,
                fontFamily: 'poppins leve',
            }
        }
    }],
    tooltip: {
        enabled: true,
        y: {
            formatter: function (val) {

                return val + "%";
            },
            title: {
                formatter: function (seriesName) {
                    return seriesName
                }
            }
        },
        theme: 'light',
        style: {
            fontSize: `${vwParaPx(0.8)}px`,
            fontFamily: 'poppins leve',
        }
    },
    legend: {
        position: 'top',
        fontSize: `${vwParaPx(1)}px`,
        fontFamily: 'poppins leve',
        color: "#000"
    },
    plotOptions: {
        pie: {
            donut: {
                size: '50%'
            }
        }
    },
    colors: ['#6ce5e8', '#41b8d5']
};
var chart = new ApexCharts(document.querySelector("#torta_baixo"), options);
chart.render();