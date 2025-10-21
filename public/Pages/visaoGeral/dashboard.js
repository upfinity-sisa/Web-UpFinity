var options = {
    series: [{
        name: "CPU",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    },
    {
        name: "RAM",
        data: [252, 188, 22, 193, 121, 183, 130, 108, 178]
    },
    {
        name: "Disco",
        data: [2, 39, 167, 65, 68, 30, 67, 255, 238]
    },
    {
        name: "Rede",
        data: [118, 54, 187, 261, 151, 193, 42, 224, 159]
    }
    ],
    legend: {
        position: 'top',
        fontSize: '16px',
        fontFamily: 'poppins medio',
        fontWeight: 'bold'
    },
    chart: {
        height: 550,
        type: 'line',
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    title: {
        text: 'Níveis dos componentes',
        align: 'center',
        style: {
            fontSize: '19px',
            fontFamily: 'poppins bold',
            fontWeight: 'bold'
        }
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
        },
    },
    colors: ['#353535', '#6ce5e8', '#41b8d5', '#1b5979'],
    xaxis: {
        categories: ['11:49:55', '11:50:00', '11:50:05', '11:50:10', '11:50:15', '11:50:20', '11:50:25', '11:50:30', '11:50:35'],
    }
};

var chart = new ApexCharts(document.querySelector("#caixagraflinha"), options);
chart.render();

var options = {
    series: [85, 20],
    labels: ["UPTIME", "DOWNTIME"],
    legend: {
        position: 'top'
    },
    chart: {
        type: 'donut',
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }],
    legend: {
        position: 'top',
        fontSize: '15px',
        fontFamily: 'poppins medio',
        fontWeight: 'bold'
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
