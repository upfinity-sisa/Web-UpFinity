function trocarSenha() {
    var senhaAntiga = document.getElementById("antiga_txt").value;
    var senhaNova = document.getElementById("nova_txt").value;
    var confirmarSenha = document.getElementById("confirmar_txt").value;

    if (senhaAntiga == "" || senhaNova == "" || confirmarSenha == "") {
        alert("Preencha todos os campos!")
        return;
    } 

    if (senhaAntiga == senhaNova) {
        alert("Sua nova senha deve ser diferente da senha antiga.")
    } else if (senhaNova != confirmarSenha) {
        alert("A nova senha está diferente de confirmar senha!")
    } else {
        alert("Senha alterada com sucesso!")
        document.getElementById("antiga_txt").value = "";
        document.getElementById("nova_txt").value = "";
        document.getElementById("confirmar_txt").value = "";
    }


    
}