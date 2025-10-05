const btnContinuar_desktop = document.getElementById('btnContinuar_desktop')
let razaoSocial;
let nomeFicticio;
let cnpj;

const form_cadastro_usuario_desktop = document.getElementById('form-cadastro-usuario-desktop')
const form_cadastro_empresa_desktop = document.getElementById('form-cadastro-empresa-desktop')

const ipts_cnpj = document.querySelectorAll('.ipt_cnpj')
const ipts_cpf_desktop = document.querySelectorAll('.ipt_cpf')

const alerta_erros_desktop = document.getElementById('alerta_erros_desktop')
const span_erro_desktop = document.getElementById('span-erro-desktop')
const btnFecharErro = document.getElementById('btnFecharErro-desktop')

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
        span_erro_desktop.innerText = 'Preencha todos os campos obrigatórios'
        return
    }

    if (ipt_nome_ficticio_desktop !== '' && ipt_nome_ficticio_desktop.trim() === '') {
        alerta_erros_desktop.classList.remove('d-none')
        span_erro_desktop.innerText = 'O nome fictício não pode conter apenas espaços em branco'
        ipt_nome_ficticio_desktop.focus()
        return
    }

    if (ipt_cnpj_desktop.length !== 18) {
        alerta_erros_desktop.classList.remove('d-none')
        span_erro_desktop.innerText = 'O CNPJ deve estar completo no formato 00.000.000/0000-00'
        ipt_cnpj_desktop.focus()
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


ipts_cnpj.forEach(input => {
    input.addEventListener("input", function () {
        let valor = this.value.replace(/\D/g, "")

        if (valor.length > 14) valor = valor.slice(0, 14)

        if (valor.length > 2) {
            valor = valor.replace(/^(\d{2})(\d)/, "$1.$2")
        }
        if (valor.length > 5) {
            valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        }
        if (valor.length > 8) {
            valor = valor.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
        }
        if (valor.length > 12) {
            valor = valor.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5")
        }

        this.value = valor
    })
})

ipts_cpf_desktop.forEach(input => {
    input.addEventListener("input", function () {
        let valor = this.value.replace(/\D/g, "")

        if (valor.length > 11) valor = valor.slice(0, 11)

        if (valor.length > 3) {
            valor = valor.replace(/^(\d{3})(\d)/, "$1.$2")
        }
        if (valor.length > 6) {
            valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        }
        if (valor.length > 9) {
            valor = valor.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
        }

        this.value = valor
    })
})

a_voltar_form_desktop.addEventListener('click', function () {

    form_cadastro_usuario_desktop.classList.add('d-none')
    form_cadastro_empresa_desktop.classList.remove('d-none')


    etapa1_desktop.src = "../../Assets/Elements/Icons/etapa1_enable.png"
    etapa2_desktop.src = "../../Assets/Elements/Icons/etapa2_disable.png"
})

btnFecharErro.addEventListener('click', function () {
    alerta_erros_desktop.classList.add('d-none')
})


