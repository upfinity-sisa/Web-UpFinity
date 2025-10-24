function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email == null || nome == null) {
        window.location = "../../Pages/Login/login.html";
    }
}

const btSair = document.getElementById('btSair');

btSair.addEventListener("click", function () {
    sessionStorage.clear();
    window.location = "../../../index.html";
})