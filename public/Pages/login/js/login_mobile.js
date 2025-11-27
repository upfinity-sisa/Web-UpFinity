// const alerta_erros_mobile = document.getElementById('alerta_erros_mobile')
// const span_erro_mobile = document.getElementById('span-erro-mobile')
// const h2_erro_mobile = document.getElementById('h2-erro-mobile')
// const btnFecharErro_mobile = document.getElementById('btnFecharErro-mobile')

// btnFecharErro_mobile.addEventListener('click', function () {
//     alerta_erros_mobile.classList.add('d-none')
// })

const ipt_email_mobile = document.getElementById('ipt_email_mobile')
const ipt_senha_mobile = document.getElementById('ipt_senha_mobile')

const btnContinuar_mobile = document.getElementById('btnContinuar_mobile')

btnContinuar_mobile.addEventListener('click', function (e) {
    e.preventDefault()
    var emailVar = ipt_email_mobile.value;
    var senhaVar = ipt_senha_mobile.value;
    alert(emailVar)
    alert(senhaVar)

    if (emailVar.trim() == "" || senhaVar.trim() == "") {
        alerta_erros_mobile.classList.remove('d-none')
        span_erro_mobile.innerText = 'Preencha todos os campos obrigatórios.'
        return
    }

    if (!validarEmail(emailVar)) {
        alerta_erros_mobile.classList.remove('d-none')
        span_erro_mobile.innerText = 'Email inválido, preencha novamente.'
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
                sessionStorage.SENHA = jsonUsuario.senha;

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
                                    window.location = '../../Pages/planos/planos.html'
                                }
                                else if (jsonUsuario.fkTipoUsuario == 3) {
                                    alerta_erros_mobile.classList.remove('d-none')
                                    h2_erro_mobile.innerText = "Acesso negado!"
                                    span_erro_mobile.innerText = 'Sua empresa possui pendências com a plataforma, entre em contato com seu administrador.'
                                }
                            }
                            else {
                                window.location = "../../Pages/visaoGeral/visaoGeral.html";
                            }
                        });

                    } else {
                        alerta_erros_mobile.classList.remove('d-none')
                        span_erro_mobile.innerText = 'Houve um erro ao buscar plano da empresa'
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
            alerta_erros_mobile.classList.remove('d-none')
            span_erro_mobile.innerText = 'Login inválido, tente novamente.'
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);

            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
})
