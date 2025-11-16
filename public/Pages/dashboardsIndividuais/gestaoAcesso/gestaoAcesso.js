function carregarAlertasHoje() {
    fetch("http://localhost:3333/gestaoAcesso/alertas-hoje").then(function (resposta) {
        return resposta.json();
    }).then(function (json) {
        document.getElementById("kpi-alertas").innerHTML = json.totalAlertasHoje;
    });
}
carregarAlertasHoje();

function carregarATMsOff() {
    fetch("http://localhost:3333/gestaoAcesso/atmsoff").then(function (resposta) {
        return resposta.json();
    }).then(function (json) {
        document.getElementById("kpi-offline").innerHTML = json.atmsOff;
    });
}
carregarATMsOff();

function carregarATMsCriticos() {
    fetch("http://localhost:3333/gestaoAcesso/atmscriticos").then(function (resposta) {
        return resposta.json();
    }).then(function (json) {
        document.getElementById("kpi-criticos").innerHTML = json.atmsCriticos;
    });
}
carregarATMsCriticos();


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

const horas = [
  "00h", "01h", "02h", "03h", "04h", "05h",
  "06h", "07h", "08h", "09h", "10h", "11h",
  "12h", "13h", "14h", "15h", "16h", "17h",
  "18h", "19h", "20h", "21h", "22h", "23h"
];

const qtdLogins = [
  2, 1, 1, 0, 0, 3,
  8, 12, 18, 25, 30, 22,
  15, 10, 8, 9, 11, 14,
  18, 20, 15, 8, 4, 3
];

const optionsLogins = {
  chart: {
    type: "line",
    height: 350,
    toolbar: { show: false }
  },
  series: [
    {
      name: "Logins",
      data: qtdLogins
    }
  ],
  xaxis: {
    categories: horas,
    title: { text: "Horário do Dia" }
  },
  yaxis: {
    title: { text: "Quantidade de Logins" }
  },
  stroke: {
    curve: "smooth",
    width: 3
  },
  colors: ["#2ED1D7"], 
  markers: {
    size: 4,
    colors: ["#232023"]
  },
  grid: {
    borderColor: "#e0e0e0"
  }
};

const chartLogins = new ApexCharts(
  document.querySelector("#grafico-login"),
  optionsLogins
);

chartLogins.render();
