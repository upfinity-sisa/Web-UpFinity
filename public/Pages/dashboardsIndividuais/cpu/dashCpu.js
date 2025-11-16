function vwParaPx(vwValue) {
    const larguraViewport = window.innerWidth;
    const valorEmPx = (larguraViewport / 100) * vwValue;
    return Math.round(valorEmPx);
}

var options = {
    series: [
        {
            name: 'Uso',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 18],
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
        categories: [
            '11:00:00',
            '11:00:03',
            '11:00:06',
            '11:00:09',
            '11:00:12',
            '11:00:15',
            '11:00:18',
            '11:00:21',
            '11:00:24',
            '11:00:27',
        ],
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
                y: 37.83,
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
                y: 31.23,
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

var chart = new ApexCharts(document.querySelector('#grafico-linha'), options);
chart.render();
