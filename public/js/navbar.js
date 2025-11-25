function abrirDashboards() {
    let botoesIndividuais = document.getElementById('botoes-ind');
    let setaDireita = document.getElementById('seta-dashboards');

    if (setaDireita.classList.contains('botao-seta-baixo')) {
        setaDireita.classList.remove('botao-seta-baixo');
        setaDireita.classList.add('botao-seta-direita');
    } else {
        setaDireita.classList.remove('botao-seta-direita');
        setaDireita.classList.add('botao-seta-baixo');
    }

    if (botoesIndividuais.classList.contains('botoes-individuais-inativo')) {
        botoesIndividuais.classList.add('botoes-individuais-ativo');
        botoesIndividuais.classList.remove('botoes-individuais-inativo');
    } else {
        botoesIndividuais.classList.remove('botoes-individuais-ativo');
        botoesIndividuais.classList.add('botoes-individuais-inativo');
    }
}
