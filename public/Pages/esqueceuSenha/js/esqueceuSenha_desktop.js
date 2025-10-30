const alerta_erros_desktop = document.getElementById('alerta_erros_desktop')
const span_erro_desktop = document.getElementById('span-erro-desktop')
const h2_erro_desktop = document.getElementById('h2-erro-desktop')
const btnFecharErro_desktop = document.getElementById('btnFecharErro-desktop')

btnFecharErro_desktop.addEventListener('click', function () {
    alerta_erros_desktop.classList.add('d-none')
})

const btnEntrar_desktop = document.getElementById('btnEntrar_desktop')

btnEntrar_desktop.addEventListener('click', function (event) {
    event.preventDefault()

    const email = document.getElementById('ipt_email_desktop').value

    if (email.trim() == "" || !validarEmail(email)) {
        alerta_erros_desktop.classList.remove('d-none')
        span_erro_desktop.innerText = 'Email inválido, tente novamente.'
        return;
    }

    fetch(`/usuarios/verificarEmail/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.ID_USUARIO = json.idUsuario;
                
            })
            alert(sessionStorage.getItem("EMAIL_USUARIO"))
            alert(sessionStorage.getItem("ID_USUARIO"))


        } else {
            alerta_erros_desktop.classList.remove('d-none')
            span_erro_desktop.innerText = 'Houve um erro ao buscar e-mail do usuário.'
            console.log("Houve um erro ao buscar e-mail do usuário!");
        }

    }).catch(function (erro) {
        console.log(erro);
    })

})
