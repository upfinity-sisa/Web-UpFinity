// 1 - CPU 
// 2 - RAM
// 3 - Disco
// 4 - Rede

let dadosCpu = []
let dadosRam = []
let dadosDisco = []
let dadosRede = []

function carregarParametros(){
  fetch(`/dashboard/pegar-parametros/${sessionStorage.getItem("FK_EMPRESA")}`, { cache: 'no-store' }).then(
    (response) => {
      if(response.ok) {
        response.json().then((resposta) => {
          for (let i = 0; i < resposta.length; i++) {
            switch(resposta[i]["fkTipoComponente"]) {
              case 1:
                if (resposta[i]["fkTipoAlerta"] == 1) {
                  sessionStorage.setItem("PARAM_CRITICO_CPU", resposta[i]["limiteMax"])
                } else {
                  sessionStorage.setItem("PARAM_IMPORTANTE_CPU", resposta[i]["limiteMax"])
                }
                break;
              case 2:
                if (resposta[i]["fkTipoAlerta"] == 1) {
                  sessionStorage.setItem("PARAM_CRITICO_RAM", resposta[i]["limiteMax"])
                } else {
                  sessionStorage.setItem("PARAM_IMPORTANTE_RAM", resposta[i]["limiteMax"])
                }           
                break;
              case 3:
                if (resposta[i]["fkTipoAlerta"] == 1) {
                  sessionStorage.setItem("PARAM_CRITICO_DISCO", resposta[i]["limiteMax"])
                } else {
                  sessionStorage.setItem("PARAM_IMPORTANTE_DISCO", resposta[i]["limiteMax"])
                }                
                break;
              default:
                break;
            }

          }
        })
      } else {
        console.error("carregarParametros: nenhum dado encontrado ou erro na API")
      }
    }
  ).catch((erro) => {
    console.error(`carregarParametros: erro na obtenção dos dados: ${erro.message}`)
  })
}

window.onload = () => {
  carregarParametros()
}