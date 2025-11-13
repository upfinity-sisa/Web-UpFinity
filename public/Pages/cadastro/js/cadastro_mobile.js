const btnContinuar_mobile = document.getElementById('btnContinuar_mobile')

const form_cadastro_usuario_mobile = document.getElementById('form-cadastro-usuario-mobile')
const form_cadastro_empresa_mobile = document.getElementById('form-cadastro-empresa-mobile')

const alerta_erros_mobile = document.getElementById('alerta_erros_mobile')
const span_erro_mobile = document.getElementById('span-erro-mobile')
const btnFecharErro_mobile = document.getElementById('btnFecharErro-mobile')

const etapa1_mobile = document.getElementById('etapa1_mobile')
const etapa2_mobile = document.getElementById('etapa2_mobile')


const a_voltar_form_mobile = document.getElementById('a-voltar-form-mobile')

btnContinuar_mobile.addEventListener('click', function (event) {
    event.preventDefault()
    const ipt_razao_social_mobile = document.getElementById('ipt_razao_social_mobile').value
    const ipt_nome_fantasia_mobile = document.getElementById('ipt_nome_fantasia_mobile').value
    const ipt_cnpj_mobile = document.getElementById('ipt_cnpj_mobile').value

    if (ipt_razao_social_mobile.trim() === '' || ipt_cnpj_mobile.trim() === '') {
        //alerta_erros_mobile.classList.remove('d-none')
        //span_erro_mobile.innerText = 'Preencha todos os campos obrigatórios.'
        alert('Preencha todos os campos obrigatórios.')
        return
    }

    if (ipt_nome_fantasia_mobile !== '' && ipt_nome_fantasia_mobile.trim() === '') {
        //alerta_erros_mobile.classList.remove('d-none')
        //span_erro_mobile.innerText = 'O nome fictício não pode conter apenas espaços em branco.'
        alert('O nome fictício não pode conter apenas espaços em branco.')
        return
    }

    if (ipt_cnpj_mobile.length !== 18) {
        //alerta_erros_mobile.classList.remove('d-none')
        //span_erro_mobile.innerText = 'O CNPJ deve estar completo no formato 00.000.000/0000-00.'
        alert('O CNPJ deve estar completo no formato 00.000.000/0000-00.')
        return
    }

    form_cadastro_usuario_mobile.classList.remove('d-none')
    form_cadastro_empresa_mobile.classList.add('d-none')


    etapa1_mobile.src = "../../Assets/Elements/Icons/etapa1_disable.png"
    etapa2_mobile.src = "../../Assets/Elements/Icons/etapa2_enable.png"
})


a_voltar_form_mobile.addEventListener('click', function () {

    form_cadastro_usuario_mobile.classList.add('d-none')
    form_cadastro_empresa_mobile.classList.remove('d-none')


    etapa1_mobile.src = "../../Assets/Elements/Icons/etapa1_enable.png"
    etapa2_mobile.src = "../../Assets/Elements/Icons/etapa2_disable.png"
})

btnFecharErro_mobile.addEventListener('click', function () {
    alerta_erros_mobile.classList.add('d-none')
})

function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email);
}


function Cadastrar() {
    btnCadastro_mobile.disabled = true;

    var razaoSocial = ipt_razao_social_mobile.value;
    var nomeFantasia = ipt_nome_fantasia_mobile.value;
    var cnpj = ipt_cnpj_mobile.value;
    var nome = ipt_nome_mobile.value;
    var email = ipt_email_mobile.value;
    var cpf = ipt_cpf_mobile.value;
    var senha = ipt_senha_mobile.value;
    var confirmarsenha = ipt_conf_senha_mobile.value;

    if (nome.trim() == '' || email.trim() == '' || cpf.trim() == '' || senha.trim() == '') {
        alerta_erros_mobile.classList.remove('d-none');
        span_erro_mobile.innerText = 'Preencha todos os campos obrigatórios.';
        btnCadastro_mobile.disabled = false;
        return;
    }

    if (!validarEmail(email)) {
        alerta_erros_mobile.classList.remove('d-none');
        span_erro_mobile.innerText = 'Email inválido, preencha novamente.';
        btnCadastro_mobile.disabled = false;
        return;
    }

    if (cpf.length !== 14) {
        alerta_erros_mobile.classList.remove('d-none');
        span_erro_mobile.innerText = 'Preencha o CPF corretamente.';
        btnCadastro_mobile.disabled = false;
        return;
    }

    if (senha != confirmarsenha) {
        alerta_erros_mobile.classList.remove('d-none');
        span_erro_mobile.innerText = 'As senhas não coincidem, verifique novamente.';
        btnCadastro_mobile.disabled = false;
        return;
    }

    fetch("/empresa/cadastrarEmpresa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            razaoSocialServer: razaoSocial,
            nomeFantasiaServer: nomeFantasia,
            cnpjServer: cnpj
        }),
    })
        .then((resposta) => {
            if (resposta.ok) {
                return fetch("/usuarios/cadastrarUsuario", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nomeServer: nome,
                        emailServer: email,
                        cpfServer: cpf,
                        senhaServer: senha,
                        cnpjServer: cnpj
                    }),
                });
            } else {
                throw "Erro ao cadastrar empresa!";
            }
        })
        .then((resposta) => {
            if (resposta.ok) {
                valida_cadastro_mobile.classList.remove('d-none');
                executarProgresso();
            } else {
                throw "Erro ao cadastrar usuário!";
            }
        })
        .catch((erro) => {
            console.log(`#ERRO: ${erro}`);
            alerta_erros_mobile.classList.remove('d-none');
            span_erro_mobile.innerText = 'Erro ao realizar cadastro, verifique os campos.';
        })
        .finally(() => {
            btnCadastro_mobile.disabled = false;
        });

    return false;
}