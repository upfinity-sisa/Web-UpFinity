// 1 - CPU
// 2 - RAM
// 3 - Disco
// 4 - Rede

let dadosCpu = [];
let dadosRam = [];
let dadosDisco = [];
let dadosRede = [];

function carregarParametros() {
  fetch(`/dashboard/pegar-parametros/${sessionStorage.getItem("FK_EMPRESA")}`, {
    cache: "no-store",
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((resposta) => {
          if (resposta.length > 0) {
            for (let i = 0; i < resposta.length; i++) {
              switch (resposta[i]["fkTipoComponente"]) {
                case 1:
                  if (resposta[i]["fkTipoAlerta"] == 1) {
                    sessionStorage.setItem(
                      "PARAM_CRITICO_CPU",
                      resposta[i]["limiteMax"]
                    );
                  } else {
                    sessionStorage.setItem(
                      "PARAM_IMPORTANTE_CPU",
                      resposta[i]["limiteMax"]
                    );
                  }
                  break;
                case 2:
                  if (resposta[i]["fkTipoAlerta"] == 1) {
                    sessionStorage.setItem(
                      "PARAM_CRITICO_RAM",
                      resposta[i]["limiteMax"]
                    );
                  } else {
                    sessionStorage.setItem(
                      "PARAM_IMPORTANTE_RAM",
                      resposta[i]["limiteMax"]
                    );
                  }
                  break;
                case 3:
                  if (resposta[i]["fkTipoAlerta"] == 1) {
                    sessionStorage.setItem(
                      "PARAM_CRITICO_DISCO",
                      resposta[i]["limiteMax"]
                    );
                  } else {
                    sessionStorage.setItem(
                      "PARAM_IMPORTANTE_DISCO",
                      resposta[i]["limiteMax"]
                    );
                  }
                  break;
                default:
                  break;
              }
            }
          } else {
            console.error("carregarParametros: nenhum parâmetro encontrado.");
          }
        });
      } else {
        console.error(
          "carregarParametros: nenhum dado encontrado ou erro na API"
        );
      }
    })
    .catch((erro) => {
      console.error(
        `carregarParametros: erro na obtenção dos dados: ${erro.message}`
      );
    });
}

function carregarDadosRede(idAtm) {
  fetch(`/dashboard/ultimas-capturas-rede/${idAtm}`, {
    cache: "no-store",
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((resposta) => {
          let kpiRede = document.getElementById("dado-kpi-rede");

          if (resposta.length > 0) {
            if (resposta[resposta.length - 1].valor > 0) {
              kpiRede.innerHTML = "Conectado";
            } else {
              kpiRede.innerHTML = "Não conectado";
            }
          } else {
            kpiRede.innerHTML = "N/D";
          }
        });
      } else {
        console.error("dadosRede: nenhum dado encontrado ou erro na API");
        document.getElementById("dado-kpi-rede").innerHTML = "Erro";
      }
    })
    .catch((erro) => {
      console.error(`dadosRede: erro na obtenção dos dados: ${erro.message}`);
    });
}

function carregarAlertas(idAtm) {
  fetch(`/dashboard/carregar-alertas/${idAtm}`, {
    cache: "no-store",
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((resposta) => {
          const boxAlertas = document.getElementById("caixalerta-baixo");
          boxAlertas.innerHTML = "";

          if (resposta.length > 0) {
            const formatarData = (data) => {
              const date = new Date(data);
              const hora = date.getHours().toString().padStart(2, "0");
              const minuto = date.getMinutes().toString().padStart(2, "0");
              const segundo = date.getSeconds().toString().padStart(2, "0");
              const dia = date.getDate().toString();
              const mes = (date.getMonth() + 1).toString();
              const ano = date.getFullYear().toString();
              return `${dia}/${mes}/${ano}, ${hora}:${minuto}:${segundo}`;
            };

            for (let i = 0; i < resposta.length; i++) {
              switch (parseInt(resposta[i].fkComponente)) {
                case 1:
                  if (resposta[i].descricao == "Moderado") {
                    boxAlertas.innerHTML += `
                    <div class="box_alerta">
                        <h3>${formatarData(resposta[i].horario)}</h3>
                        <div class="gravidade-alerta">
                            <img src="../../Assets/assets_dashboard/alertaAmarelo.png"
                                alt="simbolo de alerta moderado">
                            <h1 style="color: #f4a261;">MODERADO</h1>
                        </div>
                        <div class="componente-alerta">
                            <h4>Componente: </h4>
                            <h2>CPU</h2>
                        </div>
                    </div> 
                    `;
                  } else {
                    boxAlertas.innerHTML += `
                    <div class="box_alerta">
                      <h3>${formatarData(resposta[i].horario)}</h3>
                      <div class="gravidade-alerta">
                          <img src="../../Assets/assets_dashboard/alertaVermelho.png"
                              alt="simbolo de alerta grave">
                          <h1>CRÍTICO</h1>
                      </div>
                      <div class="componente-alerta">
                          <h4>Componente: </h4>
                          <h2>CPU</h2>
                      </div>
                    </div>
                    `;
                  }
                  break;
                case 2:
                  if (resposta[i].descricao == "Moderado") {
                    boxAlertas.innerHTML += `
                    <div class="box_alerta">
                        <h3>${formatarData(resposta[i].horario)}</h3>
                        <div class="gravidade-alerta">
                            <img src="../../Assets/assets_dashboard/alertaAmarelo.png"
                                alt="simbolo de alerta moderado">
                            <h1 style="color: #f4a261;">MODERADO</h1>
                        </div>
                        <div class="componente-alerta">
                            <h4>Componente: </h4>
                            <h2>RAM</h2>
                        </div>
                    </div> 
                    `;
                  } else {
                    boxAlertas.innerHTML += `
                    <div class="box_alerta">
                      <h3>${formatarData(resposta[i].horario)}</h3>
                      <div class="gravidade-alerta">
                          <img src="../../Assets/assets_dashboard/alertaVermelho.png"
                              alt="simbolo de alerta grave">
                          <h1>CRÍTICO</h1>
                      </div>
                      <div class="componente-alerta">
                          <h4>Componente: </h4>
                          <h2>RAM</h2>
                      </div>
                    </div>
                    `;
                  }
                  break;
                case 3:
                  if (resposta[i].descricao == "Moderado") {
                    boxAlertas.innerHTML += `
                    <div class="box_alerta">
                        <h3>${formatarData(resposta[i].horario)}</h3>
                        <div class="gravidade-alerta">
                            <img src="../../Assets/assets_dashboard/alertaAmarelo.png"
                                alt="simbolo de alerta moderado">
                            <h1 style="color: #f4a261;">MODERADO</h1>
                        </div>
                        <div class="componente-alerta">
                            <h4>Componente: </h4>
                            <h2>DISCO</h2>
                        </div>
                    </div> 
                    `;
                  } else {
                    boxAlertas.innerHTML += `
                    <div class="box_alerta">
                      <h3>${formatarData(resposta[i].horario)}</h3>
                      <div class="gravidade-alerta">
                          <img src="../../Assets/assets_dashboard/alertaVermelho.png"
                              alt="simbolo de alerta grave">
                          <h1>CRÍTICO</h1>
                      </div>
                      <div class="componente-alerta">
                          <h4>Componente: </h4>
                          <h2>DISCO</h2>
                      </div>
                    </div>
                    `;
                  }
                  break;
                default:
                  break;
              }
            }
          }
        });
      } else {
        console.error("carregarAlertas: nenhum dado encontrado ou erro na API");
      }
    })
    .catch((erro) => {
      console.error(
        `carregarAlertas: erro na obtenção dos dados: ${erro.message}`
      );
    });
}

let intervalId2 = null;
let comboATMS = document.getElementById("comboATMs");

function atualizarDados() {
  let idAtm = comboATMS.value;
  carregarDadosRede(idAtm);
  carregarAlertas(idAtm);
}

window.addEventListener("DOMContentLoaded", () => {
  carregarParametros();
  atualizarDados();
  intervalId2 = setInterval(atualizarDados, 3500);

  comboATMS.addEventListener("change", () => {
    clearInterval(intervalId2);
    atualizarDados();
    intervalId2 = setInterval(atualizarDados, 3500);
  });
});
