function validarCadastroATM() {

    var empresaVar = sessionStorage.FK_EMPRESA

    if (empresaVar == "") {
        alert("Favor informar o IP da sua máquina antes de cadastrá-la")
        return
    }

    fetch("/gestaoATM/validarCadastroATM", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idEmpresa: empresaVar,
        }),
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                console.log(resposta2)
                if (resposta2[0].qtdATMs >= resposta2[0].maxATMs) {
                    alert("Você já atingiu o limite máximo de ATMs do seu plano")
                } else {
                    cadastrarATM()
                }
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
        
}

function cadastrarATM() {

    var empresaVar = sessionStorage.FK_EMPRESA
    var ipVar = ip_atm.value
    console.log(empresaVar)
    console.log(ipVar)

    fetch("/gestaoATM/cadastrarATM", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkEmpresa: empresaVar,
            IP: ipVar,
        }),
    })
        .then(function (resposta) {
            alert("Cadastro realizado com sucesso")
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
        
        fechar()
        
}

function atualizarParametro() {

    var empresaVar = sessionStorage.FK_EMPRESA
    var tipoComponenteVar = combo_componente.value
    var tipoAlertaVar = combo_nivel_alerta.value
    var limiteMAXVar = ipt_limiteMAX.value

    if (limiteMAXVar == "") {
        alert("Favor preencher o campo de limite")
        return
    }

    fetch("/gestaoATM/atualizarParametro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkEmpresa: empresaVar,
            fkTipoComponente: tipoComponenteVar,
            fkTipoAlerta: tipoAlertaVar,
            limiteMAX: limiteMAXVar,
        }),
    })
        .then(function (resposta) {
            alert("Atualização realizada com sucesso")
            ipt_limiteMAX.value = ""
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

dadosATMs = {}
function buscarDadosATMs() {

    var fkEmpresa = sessionStorage.FK_EMPRESA

    fetch(`/gestaoATM/exibirATMs/${fkEmpresa}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                console.log(resposta2)
                dadosATMs = resposta2
                if (resposta2.length <= 0) {
                    baixo_gestao.style.justifyContent = 'center';
                    baixo_gestao.innerHTML = `
                        <div id="containerSemAtms_desktop">
                            <img id="usuario_nao_encontrado_desktop" src="../../Assets/assets_dashboard/img-0-ATMs.png">
                            <span id="spn_nao_encontrado_desktop">Ops! Você não possui ATMs cadastrados.</span>
                        </div>`
                } else {
                    exibirATMs(resposta2)
                }
            })

        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });


}
buscarDadosATMs()

function exibirATMs(resposta2) {

    baixo_gestao.innerHTML = ""
    for (let i = 0; i < resposta2.length; i++) {

        baixo_gestao.innerHTML += `
    
            <div class="caixa_gestao">
                <div class="infos_atms">
                    <div class="informacoes informacoes-extensao-atms">
                        <div class="titulos">
                            <h1>Numeração:</h1>
                            <h1>Status:</h1>
                            <h1>Estado:</h1>
                            <h1>IPV4:</h1>
                        </div>
                        <div class="infos">
                            <h1>ATM ${resposta2[i].numeracao}</h1>
                            <h1>${resposta2[i].statusEstado}</h1>
                            <h1>${resposta2[i].statusMonitoramento}</h1>
                            <h1>${resposta2[i].IP}</h1>
                        </div>
                    </div>
                </div>
                <div class="botoes">
                    <button onclick="abrirModalAtualizar()" class="btn_atualizar">Atualizar</button>
                    <button class="btn_remover">Remover</button>
                </div>
            </div>`

    }

}

function exibirATMsPorBusca() {
    vt_dados_busca = []

    if (busca_nome.value == "") {
        buscarDadosATMs()
        return
    }

    for (let i = 0; i < dadosATMs.length; i++) {
        if (dadosATMs[i].numeracao == busca_nome.value) {
            vt_dados_busca.push(dadosATMs[i])
        }
    }

    busca_nome.value = ""

    if (vt_dados_busca.length == 0) {
        alert("Não foi encontrado nenhum ATM com essa numeração")
        return
    }
    exibirATMs(vt_dados_busca)

}