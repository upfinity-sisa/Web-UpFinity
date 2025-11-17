function vwParaPx(vwValue) {
  const larguraViewport = window.innerWidth;
  const valorEmPx = (larguraViewport / 100) * vwValue;
  return Math.round(valorEmPx);
}
/*
var optionsComponentes = {
    
  series: [
    {
      name: "CPU",
      data: [20, 30, 40, 50, 60],
    },
  ],
  legend: {
    position: "top",
    fontSize: `${vwParaPx(1)}px`,
    fontFamily: "poppins leve",
    markers: {
      size: `${vwParaPx(0.4)}`,
    },
  },
  chart: {
    height: "90%",
    width: "100%",
    type: "line",
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
    curve: "straight",
    width: `${vwParaPx(0.2)}`,
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  colors: ["#6ce5e8"],
  yaxis: {
    min: 0,
    max: 100,
    labels: {
      style: {
        fontSize: `${vwParaPx(0.8)}px`,
        fontFamily: "poppins leve",
      },
    },
  },
  annotations: {
    yaxis: [
      {
        y: 37.83,
        borderColor: "#FF4560",
        strokeDashArray: 0,
      },
      {
        y: 31.23,
        borderColor: "#f4a261",
        strokeDashArray: 0,
      },
    ],
  },
  xaxis: {
    categories: ['12:30', '12:30', '12:30', '12:30', '12:30'],
    labels: {
      style: {
        fontSize: `${vwParaPx(0.8)}px`,
        fontFamily: "poppins leve",
      },
    },
  },
};

var chartLinha = new ApexCharts(
  document.querySelector("#graficoLinha"),
  optionsComponentes
);
chartLinha.render();

*/





var options = {
  series: [{
  name: 'alertas',
  data: [2, 3, 4, 4, 6, 5, 9, 11]
}],
  chart: {
  type: 'area'
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
xaxis: {
  categories: ["semana 1", "semana 2", "semana 3", "semana 4", "semana 5", "semana 6", "semana 7", "semana 8"]
},
tooltip: {
  x: {
    format: 'dd/MM/yy HH:mm'
  },
},
yaxis: {
  min: 0,
  max: 15,
  labels: {
    style: {
      fontSize: `${vwParaPx(0.8)}px`,
      fontFamily: "poppins leve",
    },
  },
},
colors: ["#00c7cd"],
};

var chart = new ApexCharts(document.querySelector("#graficoLinha"), options);
chart.render();


