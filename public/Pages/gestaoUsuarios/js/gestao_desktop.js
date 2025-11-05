const alerta_erros_desktop = document.getElementById('alerta_erros_desktop')
const span_erro_desktop = document.getElementById('span-erro-desktop')
const h2_erro_desktop = document.getElementById('h2-erro-desktop')
const btnFecharErro_desktop = document.getElementById('btnFecharErro-desktop')

btnFecharErro_desktop.addEventListener('click', function () {
    alerta_erros_desktop.classList.add('d-none')
})

function validarFuncionario() {

    if (nome_txt.value == "" || cpf_txt.value == "" || email_txt.value == "") {
        alerta_erros_desktop.classList.remove('d-none')
        span_erro_desktop.innerText = 'Campos em branco, favor preencher todos os campos.'
        return
    }

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
                    alerta_erros_desktop.classList.remove('d-none')
                    span_erro_desktop.innerText = 'Usuário já cadastrado, por favor cadastrar CPF e Email válidos'
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
            baixo_gestao.innerHTML = ""
            exibirFuncionarios()
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

function exibirCaixasFuncionarios(resposta2) {

    for (let i = 0; i < resposta2.length; i++) {

        var stringButton = `<button onclick="promoverFuncionario(${resposta2[i].idUsuario})" class="btn_promover">Promover</button>`

        if (resposta2[i].fkTipoUsuario == 2) {
            stringButton = `<button style="color: #999999; border-color: #797a7b; background-color: #f6f6f6;" class="btn_promover">Promover</button>`
        }
        console.log("Proxima fk")
        console.log(resposta2[i].fkTipoUsuario)

        var cpf_tratado = (resposta2[i].CPF).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")

        baixo_gestao.innerHTML += `
        <div class="caixa_usuario">
            <div class="informacoes">
                <div class="titulos">
                    <h1>Nome:</h1>
                    <h1>Email:</h1>
                    <h1>CPF:</h1>
                    <h1>Nível:</h1>
                </div>
                <div class="infos">
                    <h1>${resposta2[i].nome}</h1>
                    <h1>${resposta2[i].email}</h1>
                    <h1>${cpf_tratado}</h1>
                    <h1>${resposta2[i].descricao}</h1>
                </div>
            </div>
            <div class="botoes">
                ${stringButton}
                <button onclick="removerFuncionario(${resposta2[i].idUsuario})" class="btn_remover">Remover</button>
            </div>
        </div>
        `
    }

}

function exibirFuncionarios() {
    const baixo_gestao = document.getElementById('baixo_gestao')
    var fkEmpresa = sessionStorage.FK_EMPRESA
    var idUsuario = sessionStorage.ID_USUARIO

    fetch(`/gestao/exibirFuncionarios/${fkEmpresa}/${idUsuario}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then(analistas => {
                if (analistas.length >= 1) {
                    console.log(analistas)
                    baixo_gestao.style.removeProperty('justify-content');
                    baixo_gestao.innerHTML = ""
                    exibirCaixasFuncionarios(analistas)
                }
                else {
                    baixo_gestao.style.justifyContent = 'center';
                    baixo_gestao.innerHTML = `
                            <div id="containerSemAtms_desktop">
                                <img id="usuario_nao_encontrado_desktop" src="../../Assets/Elements/Icons/usuario_nao_encontrado.png">
                                <span id="spn_nao_encontrado_desktop">Ops! Você não possui funcionários cadastrados.</span>
                            </div>
                `
                }
            })

        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}
exibirFuncionarios()

function buscarFuncionarios() {

    var fkEmpresa = sessionStorage.ID_USUARIO
    var nome = busca_nome.value

    if (nome == "") {
        exibirFuncionarios()
        return
    }

    fetch(`/gestao/exibirFuncionariosPorBusca/${fkEmpresa}/${nome}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                console.log(resposta2)

                busca_nome.value = ""
                if (resposta2.length == 0) {
                    alerta_erros_desktop.classList.remove('d-none')
                    span_erro_desktop.innerText = 'Nenhum usuário com esse nome foi encontrado'
                    return
                }
                baixo_gestao.innerHTML = ""
                exibirCaixasFuncionarios(resposta2)
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

function promoverFuncionario(idFuncionario) {

    fetch("/gestao/promoverFuncionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuario: idFuncionario,
        }),
    })
        .then(function (resposta) {
            exibirFuncionarios()
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

function removerFuncionario(idFuncionario) {

    fetch("/gestao/removerFuncionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuario: idFuncionario,
        }),
    })
        .then(function (resposta) {
            exibirFuncionarios()
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}