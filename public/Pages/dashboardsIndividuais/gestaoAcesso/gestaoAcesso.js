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
    data: []
  }],
  xaxis: {
    type: 'category', // Explícito ajuda a evitar erros de inferência
    categories: [],
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

// Mova a criação do gráfico para dentro da função ou garanta que o DOM carregou
let chartNovos;

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Garante que o elemento existe antes de criar o gráfico
  const elementoGrafico = document.querySelector("#grafico-novos");

  if (elementoGrafico) {
    chartNovos = new ApexCharts(elementoGrafico, optionsNovos);
    await chartNovos.render();
    carregarGraficoNovosUsuarios();
  } else {
    console.error("Elemento #grafico-novos não encontrado!");
  }
});

async function carregarGraficoNovosUsuarios() {
  try {
    const resposta = await fetch("http://localhost:3333/gestaoAcesso/novosUsuariosPorSemana");
    let json = await resposta.json();
    console.log(json)
    json = Array.isArray(json) ? json : [json];

    // Proteção contra dados nulos
    if (!json || json.length === 0) return;

    const categorias = json.map(linha => {
      // Garante que seja string, mesmo se a data for inválida
      return linha.dia ? new Date(linha.dia).toLocaleDateString("pt-BR") : "N/A";
    });

    const valores = json.map(linha => linha.novos_usuarios || 0);

    atualizarGrafico(categorias, valores);
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}

function atualizarGrafico(categorias, valores) {

  console.log("Categorias:", categorias);
  console.log("Valores:", valores);


  chartNovos.updateOptions({
    xaxis: {
      categories: categorias
    }
  });


  chartNovos.updateSeries([{
    name: "Novos Usuários",
    data: valores
  }]);
}