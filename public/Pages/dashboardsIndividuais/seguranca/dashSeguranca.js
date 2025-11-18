function vwParaPx(vwValue) {
  const larguraViewport = window.innerWidth;
  const valorEmPx = (larguraViewport / 100) * vwValue;
  return Math.round(valorEmPx);
}

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

lista_alertas.innerHTML = ""
for (let i = 0; i < 6; i++) {
    lista_alertas.innerHTML += `
    <div class="box_alerta">
        <h3>2025-03-02 10:22:04</h3>
        <div class="gravidade-alerta">
            <img src="../../../Assets/assets_dashboard/alertaAmarelo.png"
                alt="simbolo de alerta grave">
            <h1>CRÍTICO</h1>
        </div>
        <div class="componente-alerta">
            <h4>Tentativa de conexão suspeita vinda do IP: 127.0.0.1</h4>
        </div>
    </div> 
    `
}

lista_conexoes.innerHTML = ""
for (let i = 0; i < 15; i++) {
  lista_conexoes.innerHTML += `
  <div class="box_conexao">
      <h1 class="porta_conexao">3333</h1>
      <h1 class="pipe_conexao">|</h1>
      <h1 class="ip_conexao">127.0.0.1</h1>
  </div>
  `
}

lista_arquivos.innerHTML = ""
for (let i = 0; i < 3; i++) {
  lista_arquivos.innerHTML += `
  <div class="nome_arquivo">
      <h1 class="titulo-nome-arquivo">/bin/netstat</h1>
  </div>
  <div class="linha_arquivos"></div>
  `
}

/*--------------MUITOS MOCKS PRA ARQUIVOS-----------------*/

lista_arquivos.innerHTML += `
<div class="nome_arquivo">
    <h1 class="titulo-nome-arquivo">/bin/netstat</h1>
    <img class="img-arquivo" src="../../../Assets/assets_dashboard/alertaAmarelo.png">
</div>
<div class="linha_arquivos"></div>
`

for (let i = 0; i < 8; i++) {
  lista_arquivos.innerHTML += `
  <div class="nome_arquivo">
      <h1 class="titulo-nome-arquivo">/bin/netstat</h1>
  </div>
  <div class="linha_arquivos"></div>
  `
}

for (let i = 0; i < 2; i++) {
  lista_arquivos.innerHTML += `
  <div class="nome_arquivo">
      <h1 class="titulo-nome-arquivo">/bin/netstat</h1>
      <img class="img-arquivo" src="../../../Assets/assets_dashboard/alertaAmarelo.png">
  </div>
  <div class="linha_arquivos"></div>
  `
}

lista_arquivos.innerHTML += `
  <div class="nome_arquivo">
      <h1 class="titulo-nome-arquivo">/bin/netstat</h1>
  </div>
  <div class="linha_arquivos"></div>
  `