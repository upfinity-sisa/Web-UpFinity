combo_componentes.value = "cpu";

let dados_cpu = []
let dados_ram = []
let dados_disco = []
let dados_rede = []

function ultimasCapturas() {
  fetch(`/dashboard/ultimas-capturas/1`, { cache: 'no-store' }).then(
    (response) => {
      if (response.ok) {
        response.json().then((resposta) => {
          for (let i = 0; i < resposta.length; i++){
            switch (resposta[i]["fkComponente"]) {
              case 1:
                dados_cpu.push(resposta[i]["valor"])
                break;
              case 2:
                dados_ram.push(resposta[i]["valor"])
                break;
              case 3:
                dados_disco.push(resposta[i]["valor"])
                break;
              case 4:
                dados_rede.push(resposta[i]["valor"])
                break;
              default:
                break;
            }
          }

          let kpiCpu = document.getElementById("dado-kpi-cpu");
          let kpiRam = document.getElementById("dado-kpi-ram");
          let kpiDisco = document.getElementById("dado-kpi-disco");
          let kpiRede = document.getElementById("dado-kpi-rede");

          kpiCpu.innerHTML  = dados_cpu[dados_cpu.length-1] + "%"
          kpiRam.innerHTML  = dados_ram[dados_ram.length-1] + "%"
          kpiDisco.innerHTML  = dados_disco[dados_disco.length-1] + "%"

          if (dados_rede[dados_rede.length-1] > 0) {
            kpiRede.innerHTML = "Conectado"
          } else {
            kpiRede.innerHTML = "Não conectado"
          }
        })
      } else {
        console.error("ultimasCapturas: nenhum dado encontrado ou erro na API")
      }
    }
  ).catch((erro) => {
    console.error(`ultimasCapturas: erro na obtenção dos dados: ${erro.message}`)
  })
}

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
        categories: ['11:49:50', '11:49:53', '11:49:56', '11:49:59', '11:50:02', '11:50:05', '11:50:08', '11:50:11', '11:50:14', '11:50:17'],
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
    series: [81.5, 18.5],
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

window.onload = () => {
  ultimasCapturas()
}