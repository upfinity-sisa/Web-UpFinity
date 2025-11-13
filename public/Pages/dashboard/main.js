function ultimasCapturas() {
  fetch(`/dashboard/ultimas-capturas/1`, { cache: 'no-store' }).then(
    (response) => {
      if (response.ok) {
        response.json().then((resposta) => {
          // 1 - CPU 
          // 2 - RAM
          // 3 - Disco
          // 4 - Rede

          let dadosCpu = []
          let dadosRam = []
          let dadosDisco = []
          let dadosRede = []

          for (let i = 0; i < resposta.length; i++){
            switch (resposta[i]["fkComponente"]) {
              case 1:
                dadosCpu.push(resposta[i]["valor"])
                break;
              case 2:
                dadosRam.push(resposta[i]["valor"])
                break;
              case 3:
                dadosDisco.push(resposta[i]["valor"])
                break;
              case 4:
                dadosRede.push(resposta[i]["valor"])
                break;
              default:
                break;
            }
          }
        })
      } else {
        console.error("ultimasCapturas: nenhum dado encontrado ou erro na API")
      }
    }
  ).catch((erro) => {
    console.error(`ultimasCapturas: erro na obtenção dos dados: ${erro.message}`)
  })
}

window.onload = () => {
  ultimasCapturas()
}