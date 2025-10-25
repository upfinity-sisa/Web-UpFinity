const alerta_erros_desktop = document.getElementById('alerta_erros_desktop')
const span_erro_desktop = document.getElementById('span-erro-desktop')
const h2_erro_desktop = document.getElementById('h2-erro-desktop')
const btnFecharErro_desktop = document.getElementById('btnFecharErro-desktop')

btnFecharErro_desktop.addEventListener('click', function () {
    alerta_erros_desktop.classList.add('d-none')
})

const ipt_email_desktop = document.getElementById('ipt_email_desktop')
const ipt_senha_desktop = document.getElementById('ipt_senha_desktop')

function Entrar() {
    var emailVar = ipt_email_desktop.value;
    var senhaVar = ipt_senha_desktop.value;

    if (emailVar.trim() == "" || senhaVar.trim() == "") {
        alerta_erros_desktop.classList.remove('d-none')
        span_erro_desktop.innerText = 'Preencha todos os campos obrigatórios.'
        return
    }

    if (!validarEmail(emailVar)) {
        alerta_erros_desktop.classList.remove('d-none')
        span_erro_desktop.innerText = 'Email inválido, preencha novamente.'
        return
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(jsonUsuario => {
                console.log(jsonUsuario);
                console.log(JSON.stringify(jsonUsuario));
                sessionStorage.EMAIL_USUARIO = jsonUsuario.email;
                sessionStorage.NOME_USUARIO = jsonUsuario.nome;
                sessionStorage.ID_USUARIO = jsonUsuario.idUsuario;
                sessionStorage.FK_EMPRESA = jsonUsuario.fkEmpresa;
                sessionStorage.CPF_USUARIO = jsonUsuario.CPF;
                sessionStorage.FK_TIPOUSUARIO = jsonUsuario.fkTipoUsuario;

                fetch(`/empresa/verificarPlano/${jsonUsuario.fkEmpresa}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function (resposta) {
                    if (resposta.ok) {
                        console.log(resposta);

                        resposta.json().then(jsonEmpresa => {
                            console.log(jsonEmpresa);
                            console.log(JSON.stringify(jsonEmpresa));
                            let idPlano = jsonEmpresa.fkPlano;
                            let statusPagamento = jsonEmpresa.statusPagamento;

                            if (idPlano == null || statusPagamento == 0) {
                                if (jsonUsuario.fkTipoUsuario == 2) {
                                    alert('vc n possui planos ou pagamento não realizado')
                                }
                                else if (jsonUsuario.fkTipoUsuario == 3) {
                                    alerta_erros_desktop.classList.remove('d-none')
                                    h2_erro_desktop.innerText = "Acesso negado!"
                                    span_erro_desktop.innerText = 'Sua empresa possui pendências com a plataforme, entre em contato com seu administrador.'
                                }
                            }
                            else {
                                window.location = "../../Pages/visaoGeral/visaoGeral.html";
                            }
                        });

                    } else {
                        alerta_erros_desktop.classList.remove('d-none')
                        span_erro_desktop.innerText = 'Houve um erro ao buscar plano da empresa'
                        console.log("Houve um erro ao buscar plano da empresa!");

                        resposta.text().then(texto => {
                            console.error(texto);

                        });
                    }

                }).catch(function (erro) {
                    console.log(erro);
                })
            });

        } else {
            alerta_erros_desktop.classList.remove('d-none')
            span_erro_desktop.innerText = 'Login inválido, tente novamente.'
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);

            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}