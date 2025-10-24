const alerta_erros_desktop = document.getElementById('alerta_erros_desktop')
const span_erro_desktop = document.getElementById('span-erro-desktop')
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
        console.log("ESTOU NO THEN DO entrar()!")



        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.FK_EMPRESA = json.fkEmpresa;
                sessionStorage.CPF_USUARIO = json.CPF;
                sessionStorage.FK_TIPOUSUARIO = json.fkTipoUsuario;
                

                window.location = "../../Pages/visaoGeral/visaoGeral.html";


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