const alerta_erros_desktop = document.getElementById('alerta_erros_desktop')
const span_erro_desktop = document.getElementById('span-erro-desktop')
const h2_erro_desktop = document.getElementById('h2-erro-desktop')
const btnFecharErro_desktop = document.getElementById('btnFecharErro-desktop')

btnFecharErro_desktop.addEventListener('click', function () {
    alerta_erros_desktop.classList.add('d-none')
})

function Enviar() {
    const email = document.getElementById('ipt_email_desktop').value

    if (email.trim() == "" || !validarEmail(email)) {
        alerta_erros_desktop.classList.remove('d-none')
        span_erro_desktop.innerText = 'Email inválido, tente novamente.'
        return;
    }

    fetch(`/usuario/verificarEmail/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
               
            });

        } else {
            alerta_erros_desktop.classList.remove('d-none')
            span_erro_desktop.innerText = 'Houve um erro ao buscar e-mail do usuário.'
            console.log("Houve um erro ao buscar e-mail do usuário!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}