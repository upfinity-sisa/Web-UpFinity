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
                        let statusMonitoramentoAtm = 'Normal';
                        for (let i = 0; i < resposta.length; i++) {
                            if (resposta[i].statusMonitoramento == 1) {
                                statusMonitoramentoAtm = 'Crítico';
                            } else if (resposta[i].statusMonitoramento == 2) {
                                statusMonitoramentoAtm = 'Importante';
                            }
                            if (!atmsCarregados.includes(resposta[i].numeracao)) {
                                tabelaBody.innerHTML += `
                                <tr class="linha-tabela-visao-geral" id="linha-atm${resposta[i].numeracao}">
                                        <th class="celula-tabela" scope="row">${resposta[i].numeracao}</th>
                                        <td class="celula-tabela" id="uso-cpu-atm-${resposta[i].numeracao}">${resposta[i].uso_cpu}%</td>
                                        <td class="celula-tabela" id="uso-ram-atm-${resposta[i].numeracao}">${resposta[i].uso_ram}%</td>
                                        <td class="celula-tabela" id="uso-disco-atm-${resposta[i].numeracao}">${resposta[i].uso_disco}%</td>
                                        <td class="celula-tabela">Conectado</td>
                                        <td class="celula-tabela celula-normal" id="status-monitoramento-atm-${resposta[i].numeracao}">${statusMonitoramentoAtm}</td>
                                    </tr>
                                `;
                                atmsCarregados.push(resposta[i].numeracao);
                            } else {
                                document.getElementById(
                                    `linha-atm${resposta[i].numeracao}`
                                ).innerHTML = `
                                <th class="celula-tabela" scope="row">${resposta[i].numeracao}</th>
                                        <td class="celula-tabela" id="uso-cpu-atm-${resposta[i].numeracao}">${resposta[i].uso_cpu}%</td>
                                        <td class="celula-tabela" id="uso-ram-atm-${resposta[i].numeracao}">${resposta[i].uso_ram}%</td>
                                        <td class="celula-tabela" id="uso-disco-atm-${resposta[i].numeracao}">${resposta[i].uso_disco}%</td>
                                        <td class="celula-tabela">Conectado</td>
                                        <td class="celula-tabela celula-normal" id="status-monitoramento-atm-${resposta[i].numeracao}">${statusMonitoramentoAtm}</td>
                                `;
                            }

                            if (
                                resposta[i].uso_cpu >= sessionStorage.getItem('PARAM_CRITICO_CPU')
                            ) {
                                document.getElementById(
                                    `uso-cpu-atm-${resposta[i].numeracao}`
                                ).style.color = '#e63946';
                                document.getElementById(
                                    `uso-cpu-atm-${resposta[i].numeracao}`
                                ).style.fontWeight = 'bold';
                                document.getElementById(
                                    `status-monitoramento-atm-${resposta[i].numeracao}`
                                ).innerText = 'Crítico';
                                document
                                    .getElementById(
                                        `status-monitoramento-atm-${resposta[i].numeracao}`
                                    )
                                    .classList.remove('celula-normal');
                                document
                                    .getElementById(
                                        `status-monitoramento-atm-${resposta[i].numeracao}`
                                    )
                                    .classList.add('celula-critico');
                            } else if (
                                resposta[i].uso_cpu >=
                                sessionStorage.getItem('PARAM_IMPORTANTE_CPU')
                            ) {
                                document.getElementById(
                                    `uso-cpu-atm-${resposta[i].numeracao}`
                                ).style.color = '#f4a261';
                                document.getElementById(
                                    `uso-cpu-atm-${resposta[i].numeracao}`
                                ).style.fontWeight = 'bold';
                                document.getElementById(
                                    `status-monitoramento-atm-${resposta[i].numeracao}`
                                ).innerText = 'Importante';
                                document
                                    .getElementById(
                                        `status-monitoramento-atm-${resposta[i].numeracao}`
                                    )
                                    .classList.remove('celula-normal');
                                document
                                    .getElementById(
                                        `status-monitoramento-atm-${resposta[i].numeracao}`
                                    )
                                    .classList.add('celula-importante');
                            }

                            if (
                                resposta[i].uso_ram >= sessionStorage.getItem('PARAM_CRITICO_RAM')
                            ) {
                                document.getElementById(
                                    `uso-ram-atm-${resposta[i].numeracao}`
                                ).style.color = '#e63946';
                                document.getElementById(
                                    `uso-ram-atm-${resposta[i].numeracao}`
                                ).style.fontWeight = 'bold';
                                document.getElementById(
                                    `status-monitoramento-atm-${resposta[i].numeracao}`
                                ).innerText = 'Crítico';
                                document
                                    .getElementById(
                                        `status-monitoramento-atm-${resposta[i].numeracao}`
                                    )
                                    .classList.remove('celula-normal');
                                document
                                    .getElementById(
                                        `status-monitoramento-atm-${resposta[i].numeracao}`
                                    )
                                    .classList.add('celula-critico');
                            } else if (
                                resposta[i].uso_ram >=
                                sessionStorage.getItem('PARAM_IMPORTANTE_RAM')
                            ) {
                                document.getElementById(
                                    `uso-ram-atm-${resposta[i].numeracao}`
                                ).style.color = '#f4a261';
                                document.getElementById(
                                    `uso-ram-atm-${resposta[i].numeracao}`
                                ).style.fontWeight = 'bold';
                                document.getElementById(
                                    `status-monitoramento-atm-${resposta[i].numeracao}`
                                ).innerText = 'Importante';
                                document
                                    .getElementById(
                                        `status-monitoramento-atm-${resposta[i].numeracao}`
                                    )
                                    .classList.remove('celula-normal');
                                document
                                    .getElementById(
                                        `status-monitoramento-atm-${resposta[i].numeracao}`
                                    )
                                    .classList.add('celula-importante');
                            }

                            if (
                                resposta[i].uso_disco >=
                                sessionStorage.getItem('PARAM_CRITICO_DISCO')
                            ) {
                                document.getElementById(
                                    `uso-disco-atm-${resposta[i].numeracao}`
                                ).style.color = '#e63946';
                                document.getElementById(
                                    `uso-disco-atm-${resposta[i].numeracao}`
                                ).style.fontWeight = 'bold';
                                document.getElementById(
                                    `status-monitoramento-atm-${resposta[i].numeracao}`
                                ).innerText = 'Crítico';
                                document
                                    .getElementById(
                                        `status-monitoramento-atm-${resposta[i].numeracao}`
                                    )
                                    .classList.remove('celula-normal');
                                document
                                    .getElementById(
                                        `status-monitoramento-atm-${resposta[i].numeracao}`
                                    )
                                    .classList.add('celula-critico');
                            } else if (
                                resposta[i].uso_disco >=
                                sessionStorage.getItem('PARAM_IMPORTANTE_DISCO')
                            ) {
                                document.getElementById(
                                    `uso-disco-atm-${resposta[i].numeracao}`
                                ).style.color = '#f4a261';
                                document.getElementById(
                                    `uso-disco-atm-${resposta[i].numeracao}`
                                ).style.fontWeight = 'bold';
                                document.getElementById(
                                    `status-monitoramento-atm-${resposta[i].numeracao}`
                                ).innerText = 'Importante';
                                document
                                    .getElementById(
                                        `status-monitoramento-atm-${resposta[i].numeracao}`
                                    )
                                    .classList.remove('celula-normal');
                                document
                                    .getElementById(
                                        `status-monitoramento-atm-${resposta[i].numeracao}`
                                    )
                                    .classList.add('celula-importante');
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

function abrirDashboards() {
    let botoesIndividuais = document.getElementById('botoes-ind');
    let setaDireita = document.getElementById('seta-dashboards');

    if (setaDireita.classList.contains('botao-seta-baixo')) {
        setaDireita.classList.remove('botao-seta-baixo');
        setaDireita.classList.add('botao-seta-direita');
    } else {
        setaDireita.classList.remove('botao-seta-direita');
        setaDireita.classList.add('botao-seta-baixo');
    }

    if (botoesIndividuais.classList.contains('botoes-individuais-inativo')) {
        botoesIndividuais.classList.add('botoes-individuais-ativo');
        botoesIndividuais.classList.remove('botoes-individuais-inativo');
    } else {
        botoesIndividuais.classList.remove('botoes-individuais-ativo');
        botoesIndividuais.classList.add('botoes-individuais-inativo');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    carregarParametros();
    carregarAtms();
    let intervaloAtualizacao = setInterval(carregarAtms, 3000);
});
