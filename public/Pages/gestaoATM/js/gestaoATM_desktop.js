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