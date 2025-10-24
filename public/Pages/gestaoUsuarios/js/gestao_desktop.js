function validarFuncionario() {

    var emailVar = email_txt.value
    var cpfVar = ((cpf_txt.value).replaceAll(".", "")).replaceAll("-", "")

    fetch("/gestao/validarFuncionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: emailVar,
            cpf: cpfVar,
        }),
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                console.log(resposta2)
                if (resposta2.length > 0) {
                    alert("Usuário já cadastrado, favor cadastrar CPF e Email válidos")
                    return
                }
                cadastrarFuncionario()
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

function cadastrarFuncionario() {

    var nomeVar = nome_txt.value
    var emailVar = email_txt.value
    var cpfVar = ((cpf_txt.value).replaceAll(".", "")).replaceAll("-", "")
    var permissionamentoVar = combo_permissao.value
    var empresaVar = sessionStorage.FK_EMPRESA

    fetch("/gestao/cadastrarFuncionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: nomeVar,
            email: emailVar,
            permissionamento: permissionamentoVar,
            empresa: empresaVar,
            cpf: cpfVar,
        }),
    })
        .then(function (resposta) {
            console.log("cadastro realizado com sucesso")
            nome_txt.value = ""
            email_txt.value = ""
            cpf_txt.value = ""
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}