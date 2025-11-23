// function carregarAlertasHoje() {
//   fetch("http://localhost:3333/gestaoAcesso/alertas-hoje").then(function (resposta) {
//     return resposta.json();
//   }).then(function (json) {
//     document.getElementById("kpi-alertas").innerHTML = json.totalAlertasHoje;
//   });
// }
// carregarAlertasHoje();

// function carregarATMsOff() {
//   fetch("http://localhost:3333/gestaoAcesso/atmsoff").then(function (resposta) {
//     return resposta.json();
//   }).then(function (json) {
//     document.getElementById("kpi-offline").innerHTML = json.atmsOff;
//   });
// }
// carregarATMsOff();

// function carregarATMsCriticos() {
//   fetch("http://localhost:3333/gestaoAcesso/atmscriticos").then(function (resposta) {
//     return resposta.json();
//   }).then(function (json) {
//     document.getElementById("kpi-criticos").innerHTML = json.atmsCriticos;
//   });
// }
// carregarATMsCriticos();

function empresaSemPlano() {
  fetch("http://localhost:3333/gestaoAcesso/empresasemplano").then(function (resposta) {
    return resposta.json();
  }).then(function (json) {
    document.getElementById("kpi-plano").innerHTML = json.empresaSemPlano;
  });
}
empresaSemPlano();

function carregarLoginSucesso() {
  fetch("http://localhost:3333/gestaoAcesso/loginsucesso").then(function (resposta) {
    return resposta.json();
  }).then(function (json) {
    document.getElementById("kpi-logins").innerHTML = json.LoginsSucesso;
  });
}
carregarLoginSucesso();

function carregarLoginFalho() {
  fetch("http://localhost:3333/gestaoAcesso/loginfalho").then(function (resposta) {
    return resposta.json();
  }).then(function (json) {
    document.getElementById("kpi-falhos").innerHTML = json.LoginsFalhos;
  });
}
carregarLoginFalho();


function carregarDias() {
  const select = document.getElementById("comboDias");
  select.innerHTML = "";

  const hoje = new Date();

  for (let i = 0; i < 7; i++) {
    const data = new Date();
    data.setDate(hoje.getDate() - i);

    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();

    const valorLocal = `${ano}-${mes}-${dia}`;
    const dataFormatada = `${dia}/${mes}/${ano}`;


    const option = document.createElement("option");
    option.value = valorLocal;
    option.textContent = dataFormatada;

    if (i === 0) {
      option.selected = true;
    }

    select.appendChild(option);
  }
}

document.addEventListener("DOMContentLoaded", carregarDias);

async function carregarGraficoLogins() {
  const resposta = await fetch("http://localhost:3333/gestaoAcesso/loginsPorHora");
  const json = await resposta.json();


  const horas = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}h`);
  const dados = Array(24).fill(0);

  console.log("JSON recebido:", json);


  json.forEach(linha => {
    dados[linha.hora] = linha.total;
  });

  const optionsLogins = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false }
    },

    title: {
      text: "Logins por Hora",
      align: "center",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333"
      }
    },
    series: [{
      name: "Logins",
      data: dados
    }],
    xaxis: { categories: horas },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#2ED1D7"],
    markers: { size: 4, colors: ["#232023"] },
    grid: { borderColor: "#e0e0e0" }
  };

  const chartLogins = new ApexCharts(
    document.querySelector("#grafico-login"),
    optionsLogins
  );

  chartLogins.render();
}

carregarGraficoLogins();

async function carregarGraficoNovosUsuarios() {

  const resposta = await fetch("http://localhost:3333/gestaoAcesso/novosUsuariosPorSemana");
  let json = await resposta.json();


  json = Array.isArray(json) ? json : [json];


  const categorias = json.map(linha => new Date(linha.dia).toLocaleDateString("pt-BR"));
  const valores = json.map(linha => linha.novos_usuarios);

  const optionsNovos = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false }
    },

    title: {
      text: "Novos Usuários por Dia (Últimos 7 dias)",
      align: "center",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333"
      }
    },

    series: [{
      name: "Novos Usuários",
      data: valores
    }],

    xaxis: {
      categories: categorias,
      labels: { rotate: -20 }
    },

    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%"
      }
    },

    colors: ["#268184"],

    grid: { borderColor: "#e0e0e0" }
  };

  const chartNovos = new ApexCharts(
    document.querySelector("#grafico-novos"),
    optionsNovos
  );

  chartNovos.render();
}

carregarGraficoNovosUsuarios();

