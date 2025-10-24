function vwParaPx(vwValue) {
    const larguraViewport = window.innerWidth;
    const valorEmPx = (larguraViewport / 100) * vwValue;
    return Math.round(valorEmPx);
}

var options = {
    series: [{
        name: "CPU",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 76]
    },
    {
        name: "RAM",
        data: [24, 53, 74, 89, 75, 20, 40, 13, 30]
    },
    {
        name: "Disco",
        data: [20, 39, 20, 65, 40, 30, 67, 50, 60]
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
        height: "100%",
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
    title: {
        text: 'Níveis dos componentes',
        align: 'center',
        style: {
            fontSize: `${vwParaPx(1.2)}px`,
            fontFamily: 'poppins bold',
            fontWeight: 'bold',
            color: "#3c4041"
        }
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
        }
    },
    colors: ['#FF0000', '#00FF00', '#0adedeff'],
    yaxis: {
        labels: {
            style: {
                fontSize: `${vwParaPx(0.8)}px`,
                fontFamily: 'poppins leve'
            }
        }
    },
    xaxis: {
        categories: ['11:49:55', '11:50:00', '11:50:05', '11:50:10', '11:50:15', '11:50:20', '11:50:25', '11:50:30', '11:50:35'],
        labels: {
            style: {
                fontSize: `${vwParaPx(0.8)}px`,
                fontFamily: 'poppins leve'
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector("#caixagraflinha"), options);
chart.render();

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

                return val + " (unidades ou seu valor original)";
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
            fontFamily: 'poppins',
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