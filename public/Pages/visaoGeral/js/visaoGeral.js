function carregarParametros() {
    fetch(`/dashboard/pegar-parametros/${sessionStorage.getItem('FK_EMPRESA')}`, {
        cache: 'no-store',
    })
        .then(response => {
            if (response.ok) {
                response.json().then(resposta => {
                    if (resposta.length > 0) {
                        for (let i = 0; i < resposta.length; i++) {
                            switch (resposta[i]['fkTipoComponente']) {
                                case 1:
                                    if (resposta[i]['fkTipoAlerta'] == 1) {
                                        sessionStorage.setItem(
                                            'PARAM_CRITICO_CPU',
                                            resposta[i]['limiteMax']
                                        );
                                    } else {
                                        sessionStorage.setItem(
                                            'PARAM_IMPORTANTE_CPU',
                                            resposta[i]['limiteMax']
                                        );
                                    }
                                    break;
                                case 2:
                                    if (resposta[i]['fkTipoAlerta'] == 1) {
                                        sessionStorage.setItem(
                                            'PARAM_CRITICO_RAM',
                                            resposta[i]['limiteMax']
                                        );
                                    } else {
                                        sessionStorage.setItem(
                                            'PARAM_IMPORTANTE_RAM',
                                            resposta[i]['limiteMax']
                                        );
                                    }
                                    break;
                                case 3:
                                    if (resposta[i]['fkTipoAlerta'] == 1) {
                                        sessionStorage.setItem(
                                            'PARAM_CRITICO_DISCO',
                                            resposta[i]['limiteMax']
                                        );
                                    } else {
                                        sessionStorage.setItem(
                                            'PARAM_IMPORTANTE_DISCO',
                                            resposta[i]['limiteMax']
                                        );
                                    }
                                    break;
                                case 5:
                                    if (resposta[i]['fkTipoAlerta'] == 1) {
                                        sessionStorage.setItem(
                                            'PARAM_CRITICO_TEMPERATURA_CPU',
                                            resposta[i]['limiteMax']
                                        );
                                    } else {
                                        sessionStorage.setItem(
                                            'PARAM_IMPORTANTE_TEMPERATURA_CPU',
                                            resposta[i]['limiteMax']
                                        );
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    } else {
                        console.error('carregarParametros: nenhum parâmetro encontrado.');
                    }
                });
            } else {
                console.error('carregarParametros: nenhum dado encontrado ou erro na API');
            }
        })
        .catch(erro => {
            console.error(`carregarParametros: erro na obtenção dos dados: ${erro.message}`);
        });
}
let atmsCarregados = [];
function carregarAtms() {
    fetch(`/visaoGeral/getAtms/${sessionStorage.getItem('FK_EMPRESA')}`, {
        cache: 'no-store',
    })
        .then(response => {
            if (response.ok) {
                response.json().then(resposta => {
                    if (resposta.length > 0) {
                        let tabelaBody = document.getElementById('corpo-tabela-visao-geral');
                        console.log(resposta);
                        for (let i = 0; i < resposta.length; i++) {
                            if (atmsCarregados.includes(resposta[i].numeracao)) {
                                continue;
                            } else {
                                tabelaBody.innerHTML += `
                                <tr class="linha-tabela-visao-geral">
                                        <th class="celula-tabela" scope="row">${resposta[i].numeracao}</th>
                                        <td class="celula-tabela">${resposta[i].uso_cpu}%</td>
                                        <td class="celula-tabela">${resposta[i].uso_ram}%</td>
                                        <td class="celula-tabela">${resposta[i].uso_disco}%</td>
                                        <td class="celula-tabela">Conectado</td>
                                        <td class="celula-tabela celula-normal">Normal</td>
                                    </tr>
                                `;

                                atmsCarregados.push(resposta[i].numeracao);
                            }
                        }
                    } else {
                        console.error('carregarAtms: nenhum parâmetro encontrado.');
                    }
                });
            } else {
                console.error('carregarAtms: nenhum dado encontrado ou erro na API');
            }
        })
        .catch(erro => {
            console.error(`carregarAtms: erro na obtenção dos dados: ${erro.message}`);
        });
}

window.addEventListener('DOMContentLoaded', () => {
    carregarParametros();
    carregarAtms();
    let intervaloAtualizacao = setInterval(carregarAtms, 3000);
});
