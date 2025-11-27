let dia;

document.addEventListener("DOMContentLoaded", () => {
  carregarDias();

  const select = document.getElementById("comboDias");
  dia = select.value; 

  select.addEventListener("change", () => {
    dia = select.value;
    carregarDashboard();
  });

  carregarDashboard();
});



function carregarDashboard() {
  empresaSemPlano();
  carregarLoginSucesso();
  carregarLoginFalho();
  carregarGraficoLogins();
  carregarGraficoNovosUsuarios();
}


function empresaSemPlano() {
  fetch(`3.212.222.224:3333/gestaoAcesso/empresasemplano`)
    .then(res => res.json())
    .then(json => {
      document.getElementById("kpi-plano").innerHTML = json.empresaSemPlano;
    });
}

function carregarLoginSucesso() {
  fetch(`3.212.222.224:3333/gestaoAcesso/loginsucesso?dia=${dia}`)
    .then(res => res.json())
    .then(json => {
      document.getElementById("kpi-logins").innerHTML = json.LoginsSucesso;
    });
}


function carregarLoginFalho() {
  fetch(`3.212.222.224:3333/gestaoAcesso/loginfalho?dia=${dia}`)
    .then(res => res.json())
    .then(json => {
      document.getElementById("kpi-falhos").innerHTML = json.LoginsFalhos;
    });
}


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

    if (i === 0) option.selected = true;

    select.appendChild(option);
  }
}


async function carregarGraficoLogins() {
  const resposta = await fetch(
    `3.212.222.224:3333/gestaoAcesso/loginsPorHora?dia=${dia}`
  );
  const json = await resposta.json();

  const horas = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}h`);
  const dados = Array(24).fill(0);

  json.forEach(linha => {
    dados[linha.hora] = linha.total;
  });

  const optionsLogins = {
    chart: { type: "line", height: 350, toolbar: { show: false } },
    title: {
      text: "Logins por Hora",
      align: "center",
      style: { fontSize: "20px", fontWeight: "bold", color: "#333" }
    },
    series: [{ name: "Logins", data: dados }],
    xaxis: { categories: horas },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#2ED1D7"],
    markers: { size: 4, colors: ["#232023"] },
    grid: { borderColor: "#e0e0e0" }
  };

  document.querySelector("#grafico-login").innerHTML = "";
  const chartLogins = new ApexCharts(
    document.querySelector("#grafico-login"),
    optionsLogins
  );
  chartLogins.render();
}


const optionsNovos = {
  chart: { type: "bar", height: 350, toolbar: { show: false } },
  title: {
    text: "Novos Usuários por Dia (Últimos 7 dias)",
    align: "center",
    style: { fontSize: "20px", fontWeight: "bold", color: "#333" }
  },
  series: [{ name: "Novos Usuários", data: [] }],
  xaxis: { type: "category", categories: [], labels: { rotate: -20 } },
  plotOptions: { bar: { borderRadius: 6, columnWidth: "45%" } },
  colors: ["#268184"],
  grid: { borderColor: "#e0e0e0" }
};

let chartNovos;

document.addEventListener("DOMContentLoaded", async () => {
  const div = document.querySelector("#grafico-novos");

  if (div) {
    chartNovos = new ApexCharts(div, optionsNovos);
    await chartNovos.render();
  }
});

async function carregarGraficoNovosUsuarios() {
  try {
    const resposta = await fetch(
      "3.212.222.224:3333/gestaoAcesso/novosUsuariosPorSemana"
    );
    let json = await resposta.json();

    json = Array.isArray(json) ? json : [json];
    if (!json || json.length === 0) return;

    const categorias = json.map(linha =>
      linha.dia ? new Date(linha.dia).toLocaleDateString("pt-BR", {timeZone: "UTC"}) : "N/A"
    );

    const valores = json.map(linha => linha.novos_usuarios || 0);

    atualizarGrafico(categorias, valores);
  } catch (err) {
    console.error("Erro ao carregar dados:", err);
  }
}

function atualizarGrafico(categorias, valores) {
  chartNovos.updateOptions({ xaxis: {type: "category", categories: categorias, labels: {rotate: -20 } } });
  chartNovos.updateSeries([{ name: "Novos Usuários", data: valores }]);
}
