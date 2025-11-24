// const alerta_erros_desktop = document.getElementById('alerta_erros_desktop')
// const span_erro_desktop = document.getElementById('span-erro-desktop')
// const h2_erro_desktop = document.getElementById('h2-erro-desktop')
// const btnFecharErro_desktop = document.getElementById('btnFecharErro-desktop')

// btnFecharErro_desktop.addEventListener('click', function () {
//     alerta_erros_desktop.classList.add('d-none')
// })

function validarRedirecionamento(endpoint) {
    if (sessionStorage.FK_TIPOUSUARIO == 3) {
        alerta_erros_desktop.classList.remove('d-none')
        span_erro_desktop.innerText = 'Você não tem permissão para entrar nessa página'
        return;
    }

    window.location = `${endpoint}`
}