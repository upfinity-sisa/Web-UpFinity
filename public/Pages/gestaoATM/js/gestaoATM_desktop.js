function validarCadastroATM() {

    var empresaVar = sessionStorage.FK_EMPRESA

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

