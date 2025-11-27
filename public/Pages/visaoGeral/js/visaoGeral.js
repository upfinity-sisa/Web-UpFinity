let idEmpresa = sessionStorage.getItem('FK_EMPRESA');
let listaAtmsGlobal = [];

const buscaFiltros = document.getElementById('busca-filtros');
const buttonFiltrar = document.getElementById('button-filtrar');
const selStatus = document.getElementById('select_status');
const selComponente = document.getElementById('select_componente');
const selOrdenacao = document.getElementById('select_ordenacao');

window.addEventListener('DOMContentLoaded', () => {
    carregarParametros();
    carregarAtms();
});

selStatus.addEventListener('change', aplicarFiltros);
selComponente.addEventListener('change', aplicarFiltros);
selOrdenacao.addEventListener('change', aplicarFiltros);


buttonFiltrar.addEventListener('click', function () {
    let numeracaoATM = Number(buscaFiltros.value);

    if (numeracaoATM > 0) {

        fetch(`/visaoGeral/BuscarATM/${idEmpresa}/${numeracaoATM}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(resposta => {
                        if (resposta.length > 0) {
                            listaAtmsGlobal = resposta;
                            aplicarFiltros();
                        } else {
                            alert("Nenhum ATM encontrado com essa numeração.");
                        }
                    });
                } else {
                    console.error("Erro na resposta da API");
                }
            })
            .catch(erro => console.error(erro));
    } else {
        carregarAtms();
    }
});

function carregarParametros() {
    fetch(`/dashboard/pegar-parametros/${idEmpresa}`, { cache: 'no-store' })
        .then(response => {
            if (response.ok) {
                response.json().then(resposta => {
                    if (resposta.length > 0) {
                        resposta.forEach(param => {
                            let tipo = param.fkTipoComponente;
                            let alerta = param.fkTipoAlerta;
                            let limite = param.limiteMax;

                            switch (tipo) {
                                case 1:
                                    sessionStorage.setItem(alerta == 1 ? 'PARAM_CRITICO_CPU' : 'PARAM_IMPORTANTE_CPU', limite);
                                    break;
                                case 2:
                                    sessionStorage.setItem(alerta == 1 ? 'PARAM_CRITICO_RAM' : 'PARAM_IMPORTANTE_RAM', limite);
                                    break;
                                case 3:
                                    sessionStorage.setItem(alerta == 1 ? 'PARAM_CRITICO_DISCO' : 'PARAM_IMPORTANTE_DISCO', limite);
                                    break;
                            }
                        });
                    }
                });
            }
        })
        .catch(erro => console.error(`Erro parâmetros: ${erro.message}`));
}

function carregarAtms() {
    fetch(`/visaoGeral/getAtms/${idEmpresa}`, { cache: 'no-store' })
        .then(response => {
            if (response.ok) {
                response.json().then(resposta => {
                    if (resposta.length > 0) {


                        


                        listaAtmsGlobal = resposta;
                        aplicarFiltros();
                    }
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(erro => console.error(`Erro ATMs: ${erro.message}`));
}

function aplicarFiltros() {
    
    let statusFiltro = selStatus.value;
    let componenteFiltro = selComponente.value;
    let ordenacaoFiltro = selOrdenacao.value;

    
    let listaFiltrada = [...listaAtmsGlobal];
    
    if (statusFiltro !== 'todos_status') {
        listaFiltrada = listaFiltrada.filter(atm => {
            if (statusFiltro === 'critico') return atm.statusMonitoramento == 1;
            if (statusFiltro === 'moderado') return atm.statusMonitoramento == 2;
            if (statusFiltro === 'normal') return atm.statusMonitoramento != 1 && atm.statusMonitoramento != 2;
            return true;
        });
    }
    
    const getValorOrdenacao = (atm, componente) => {
        
        if (componente === 'todos-componentes') {
            return Number(atm.numeracao);
        }

        switch (componente) {
            case 'cpu': return Number(atm.uso_cpu) || 0;
            case 'ram': return Number(atm.uso_ram) || 0;
            case 'disco': return Number(atm.uso_disco) || 0;
            case 'rede': return Number(atm.conexao) || 0; 
            default: return Number(atm.numeracao);
        }
    };

    listaFiltrada.sort((a, b) => {
        
        let valorA = getValorOrdenacao(a, componenteFiltro);
        let valorB = getValorOrdenacao(b, componenteFiltro);
        
        if (ordenacaoFiltro === 'decrescente') {
            return valorB - valorA; 
        } else {
            return valorA - valorB; 
        }
    });

    console.log("Lista filtrada e ordenada:", listaFiltrada); 
    plotarTabela(listaFiltrada);
}


function plotarTabela(lista) {
    let tabelaBody = document.getElementById('corpo-tabela-visao-geral');
    tabelaBody.innerHTML = '';
    console.table(listaAtmsGlobal)
    lista.forEach(atm => {

        let textoStatusGeral = 'Normal';
        let classeStatusGeral = 'celula-normal';

        if (atm.statusMonitoramento == 1) {
            textoStatusGeral = 'Crítico';
            classeStatusGeral = 'celula-critico';
        } else if (atm.statusMonitoramento == 2) {
            textoStatusGeral = 'Importante';
            classeStatusGeral = 'celula-importante';
        }

        const estiloCPU = obterEstiloComponente(atm.uso_cpu, 'CPU');
        const estiloRAM = obterEstiloComponente(atm.uso_ram, 'RAM');
        const estiloDisco = obterEstiloComponente(atm.uso_disco, 'DISCO');

            
        let textoConexao = atm.conexao > 0 ? 'Conectado' : 'Desconectado';

        tabelaBody.innerHTML += `
            <tr class="linha-tabela-visao-geral" id="linha-atm${atm.numeracao}">
                <th class="celula-tabela" scope="row">${atm.numeracao}</th>
                
                <td class="celula-tabela" id="uso-cpu-atm-${atm.numeracao}" style="${estiloCPU.style}">
                    ${atm.uso_cpu}%
                </td>
                
                <td class="celula-tabela" id="uso-ram-atm-${atm.numeracao}" style="${estiloRAM.style}">
                    ${atm.uso_ram}%
                </td>
                
                <td class="celula-tabela" id="uso-disco-atm-${atm.numeracao}" style="${estiloDisco.style}">
                    ${atm.uso_disco}%
                </td>
                
                <td class="celula-tabela" id="conexao-atm-${atm.numeracao}">
                    ${textoConexao}
                </td>
                
                <td class="celula-tabela ${classeStatusGeral}" id="status-monitoramento-atm-${atm.numeracao}">
                    ${textoStatusGeral}
                </td>
            </tr>
        `;
    });
}


function obterEstiloComponente(valor, tipo) {
    let critico = Number(sessionStorage.getItem(`PARAM_CRITICO_${tipo}`));
    let importante = Number(sessionStorage.getItem(`PARAM_IMPORTANTE_${tipo}`));


    let resultado = { style: '' };

    if (valor >= critico) {
        resultado.style = 'color: #e63946; font-weight: bold;';
    } else if (valor >= importante) {
        resultado.style = 'color: #f4a261; font-weight: bold;';
    }

    return resultado;
}