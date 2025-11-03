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

