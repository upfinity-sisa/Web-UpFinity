
function vwParaPx(vwValue) {
    const larguraViewport = window.innerWidth;
    const valorEmPx = (larguraViewport / 100) * vwValue;
    return Math.round(valorEmPx);
}


const grafico1 = document.getElementById('grafico1')

var options_grafico1 = {
    chart: {
        type: 'bar',
        height: 350,
    },
    series: [{
        name: 'Alertas',
        data: [30, 50, 70, 40]
    }],
    colors: ['#00C6CC'],
    xaxis: {
        categories: ['CPU', 'RAM', 'Disco', 'Rede']
    },
    plotOptions: {
        bar: {
            horizontal: true,
            borderRadius: 2,
            barHeight: '50%',
        }
    },
    dataLabels: {
        enabled: true,
    }
}

var chart_grafico1 = new ApexCharts(grafico1, options_grafico1);
chart_grafico1.render();

const grafico2 = document.getElementById('grafico2')

var options_grafico2 = {
    chart: {
        type: 'bar',
        height: 350
    },
    series: [{
        name: 'Alertas',
        data: [30, 50, 70, 40]
    }],
    colors: ['#00C6CC'],
    xaxis: {
        categories: ['CPU', 'RAM', 'Disco', 'Rede']
    },
    plotOptions: {
        bar: {
            horizontal: true,
            borderRadius: 2,
            barHeight: '50%'
        }
    },
    dataLabels: {
        enabled: true
    }
};

var chart_grafico2 = new ApexCharts(grafico2, options_grafico2);
chart_grafico2.render();

const grafico3 = document.getElementById('grafico3')

var options_grafico3 = {
    chart: {
        type: 'pie',
        height: 220
    },

    series: [20, 50],

    labels: ['Moderado', 'Crítico'],
    colors: ['#0bd0efff', '#268184'],

    dataLabels: {
        enabled: true,
        formatter: function (val) {
            return val.toFixed(1) + "%";
        },
        style: {
            fontSize: `${vwParaPx(1)}`,
        }
    },

    legend: {
        show: true,
        position: 'bottom'
    }
};

var chart_grafico3 = new ApexCharts(grafico3, options_grafico3);
chart_grafico3.render();

// Gerenciar pop-up

const img_fechar_gerenciar = document.getElementById('img_fechar_gerenciar')
const btn_abrir_gerenciar = document.getElementById('btn_gerenciar')
const container_pai_gerenciar = document.getElementById('container_sombra')

img_fechar_gerenciar.addEventListener('click', function(){
    container_pai_gerenciar.classList.add('d-none')
})

btn_abrir_gerenciar.addEventListener('click', function(){
    container_pai_gerenciar.classList.remove('d-none')
})
