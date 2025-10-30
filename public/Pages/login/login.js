function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email);
}

function validacao() {
    var email = document.getElementById("ipt_email_desktop").value;

    if (email == "") {
        alert("Preencha seu email!")
        return;
    }
}

