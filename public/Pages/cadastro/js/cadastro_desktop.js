let razaoSocial;
let nomeFicticio;
let cnpj;


const btnContinuar_desktop = document.getElementById('btnContinuar_desktop')

const form_cadastro_usuario_desktop = document.getElementById('form-cadastro-usuario-desktop')
const form_cadastro_empresa_desktop = document.getElementById('form-cadastro-empresa-desktop')

const alerta_erros_desktop = document.getElementById('alerta_erros_desktop')
const span_erro_desktop = document.getElementById('span-erro-desktop')
const btnFecharErro_desktop = document.getElementById('btnFecharErro-desktop')

const etapa1_desktop = document.getElementById('etapa1_desktop')
const etapa2_desktop = document.getElementById('etapa2_desktop')


const a_voltar_form_desktop = document.getElementById('a-voltar-form-desktop')

btnContinuar_desktop.addEventListener('click', function (event) {
    event.preventDefault()
    const ipt_razao_social_desktop = document.getElementById('ipt_razao_social_desktop').value
    const ipt_nome_ficticio_desktop = document.getElementById('ipt_nome_ficticio_desktop').value
    const ipt_cnpj_desktop = document.getElementById('ipt_cnpj_desktop').value

    if (ipt_razao_social_desktop.trim() === '' || ipt_cnpj_desktop.trim() === '') {
        alerta_erros_desktop.classList.remove('d-none')
        span_erro_desktop.innerText = 'Preencha todos os campos obrigatórios.'
        return
    }

    if (ipt_nome_ficticio_desktop !== '' && ipt_nome_ficticio_desktop.trim() === '') {
        alerta_erros_desktop.classList.remove('d-none')
        span_erro_desktop.innerText = 'O nome fictício não pode conter apenas espaços em branco.'
        return
    }

    if (ipt_cnpj_desktop.length !== 18) {
        alerta_erros_desktop.classList.remove('d-none')
        span_erro_desktop.innerText = 'O CNPJ deve estar completo no formato 00.000.000/0000-00.'
        return
    }

    razaoSocial = ipt_razao_social_desktop
    nomeFicticio = ipt_nome_ficticio_desktop
    cnpj = ipt_cnpj_desktop

    form_cadastro_usuario_desktop.classList.remove('d-none')
    form_cadastro_empresa_desktop.classList.add('d-none')


    etapa1_desktop.src = "../../Assets/Elements/Icons/etapa1_disable.png"
    etapa2_desktop.src = "../../Assets/Elements/Icons/etapa2_enable.png"
})


a_voltar_form_desktop.addEventListener('click', function () {

    form_cadastro_usuario_desktop.classList.add('d-none')
    form_cadastro_empresa_desktop.classList.remove('d-none')


    etapa1_desktop.src = "../../Assets/Elements/Icons/etapa1_enable.png"
    etapa2_desktop.src = "../../Assets/Elements/Icons/etapa2_disable.png"
})

btnFecharErro_desktop.addEventListener('click', function () {
    alerta_erros_desktop.classList.add('d-none')
})

// validando empresa

const btnCadastro_desktop = document.getElementById("btnCadastro_desktop");
const valida_cadastro_desktop = document.getElementById("valida_cadastro_desktop");
const circulo_progresso_desktop = document.getElementById("circulo_progresso_desktop");
const porcentagem_progresso = document.getElementById("porcentagem_progresso_desktop");
const container_info_progresso_desktop = document.getElementById("container_info_progresso_desktop");
const btn_valida_desktop = document.getElementById("btn_valida_desktop");

const raio = 40;
const circunferencia = 2 * Math.PI * raio;

circulo_progresso_desktop.style.strokeDasharray = `${circunferencia}`;
circulo_progresso_desktop.style.strokeDashoffset = circunferencia;

function carregamentoProgresso(percent) {
    if (percent >= 0 && percent <= 100) {
        const offset = circunferencia * (1 - percent / 100);
        circulo_progresso_desktop.style.strokeDashoffset = offset;
        porcentagem_progresso.textContent = `${percent}%`;
    }
}

const controle_aguarde = setInterval(() => {
    container_info_progresso_desktop.innerText += '.'
    if (container_info_progresso_desktop.innerText.slice(-4) === '....') {
        container_info_progresso_desktop.innerText = container_info_progresso_desktop.innerText.slice(0, -4)
    }
}, 325)

const array_carregamento = [25, 10, 200, 20, 100, 10, 40, 1000];
let indice_carregamento = 0;
let progresso = 0;

function executarProgresso() {
    progresso++;
    carregamentoProgresso(progresso);

    if (progresso >= 100) {
        clearInterval(controle_aguarde);
        circulo_progresso_desktop.style.stroke = '#1ede0d';
        porcentagem_progresso.style.color = "#1ede0d";
        container_info_progresso_desktop.innerText = 'Empresa validada com sucesso!';
        btn_valida_desktop.classList.remove('d-none');
        return;
    }

    indice_carregamento++
    if (indice_carregamento + 1 == array_carregamento.length) {
        indice_carregamento = 0;
    }

    setTimeout(executarProgresso, array_carregamento[indice_carregamento]);
}

function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email);
}

btnCadastro_desktop.addEventListener("click", function (event) {
    event.preventDefault();

    const ipt_nome_desktop = document.getElementById('ipt_nome_desktop').value
    const ipt_email_desktop = document.getElementById('ipt_email_desktop').value
    const ipt_cpf_desktop = document.getElementById('ipt_cpf_desktop').value
    const ipt_senha_desktop = document.getElementById('ipt_senha_desktop').value
    const ipt_conf_senha_desktop = document.getElementById('ipt_conf_senha_desktop').value

    if (ipt_nome_desktop.trim() == '' || ipt_email_desktop.trim() == '' || ipt_cpf_desktop.trim() == '' || ipt_senha_desktop.trim() == '') {
        alerta_erros_desktop.classList.remove('d-none')
        span_erro_desktop.innerText = 'Preencha todos os campos obrigatórios.'
        return
    }
    if (!validarEmail(ipt_email_desktop)) {
        alerta_erros_desktop.classList.remove('d-none')
        span_erro_desktop.innerText = 'Email inválido, preencha novamente.'
        return
    }
    if (ipt_cpf_desktop.length !== 14) {
        alerta_erros_desktop.classList.remove('d-none')
        span_erro_desktop.innerText = 'Preencha o cpf corretamente.'
        return
    }
    if (ipt_senha_desktop != ipt_conf_senha_desktop) {
        alerta_erros_desktop.classList.remove('d-none')
        span_erro_desktop.innerText = 'As senhas não coincidem, verifique novamente.'
        return
    }

    valida_cadastro_desktop.classList.remove('d-none')
    executarProgresso();
})


btn_valida_desktop.addEventListener('click', function () {
    window.location = '.././login/login.html';
})

function cadastrar() {
    var razaoSocial = ipt_razao_social_desktop.value;
    var nomeFicticio = ipt_nome_ficticio_desktop.value;
    var cnpj = ipt_cnpj_desktop.value;
    var nome = ipt_nome_desktop.value;
    var email = ipt_email_desktop.value;
    var cpf = ipt_cpf_desktop.value;
    var senha = ipt_senha_desktop.value;


    fetch("/usuarios/cadastrarEmpresa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        razaoSocialSever: razaoSocial,
        nomeFicticioSever: nomeFicticio,
        cnpjSever: cnpj
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          
        fetch("/usuarios/cadastrarUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nome,
        emailServer: email,
        cpfSever: cpf,
        senhaServer: senha
      }),
    })

          



          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });

    return false;
  }

