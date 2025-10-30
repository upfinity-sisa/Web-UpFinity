const alerta_erros_desktop = document.getElementById('alerta_erros_desktop')
const span_erro_desktop = document.getElementById('span-erro-desktop')
const h2_erro_desktop = document.getElementById('h2-erro-desktop')
const btnFecharErro_desktop = document.getElementById('btnFecharErro-desktop')

const container_adquirir_planos_desktop = document.getElementById('container_adquirir_planos_desktop');
const a_fechar_adquirir_planos_desktop = document.getElementById('a_fechar_adquirir_planos_desktop')
const btn_adquirir_planos_desktop = document.querySelectorAll('.btn_adquirir_planos_desktop');

btn_adquirir_planos_desktop.forEach(btn => {
    btn.addEventListener('click', function () {
        container_adquirir_planos_desktop.classList.remove('d-none')
        gerarQRCodeAleatorioDesktop()
    })
})

a_fechar_adquirir_planos_desktop.addEventListener('click', function () {
    container_adquirir_planos_desktop.classList.add('d-none')
})

const adquirir_p1_desktop = document.getElementById('adquirir_p1_desktop')
const adquirir_p2_desktop = document.getElementById('adquirir_p2_desktop')
const adquirir_p3_desktop = document.getElementById('adquirir_p3_desktop')

const spn_timer_desktop = document.getElementById('spn_timer_desktop')

let planoEscolhido;
let fk_empresa = sessionStorage.getItem('FK_EMPRESA');

adquirir_p1_desktop.addEventListener('click', function () {
    planoEscolhido = 1;
})

adquirir_p2_desktop.addEventListener('click', function () {
    planoEscolhido = 2;
})
adquirir_p3_desktop.addEventListener('click', function () {
    planoEscolhido = 3;
})

function stringAleatoriaDesktop(len = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let s = '';
    for (let i = 0; i < len; i++) {
        s += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return s;
}

let timer
let fechar_timer

function vwParaPx(vwValue) {
    const larguraViewport = window.innerWidth;
    const valorEmPx = (larguraViewport / 100) * vwValue;
    return Math.round(valorEmPx);
}

async function gerarQRCodeAleatorioDesktop() {
    clearInterval(fechar_timer)
    clearInterval(timer)
    let tempo = 5 * 60
    spn_timer_desktop.innerHTML = `<b>05:00</b>`;

    const text = stringAleatoriaDesktop(40);

    const canvas = document.getElementById('qrCode_desktop');
    const spn_code_desktop = document.getElementById('spn_code_desktop');

    spn_code_desktop.innerText = text.slice(0, 15) + ".gov.bcb.pix" + text.slice(16, 31) + "UPFINITY"

    await QRCode.toCanvas(canvas, text, {
        width: vwParaPx(14),
        margin: 1,
        errorCorrectionLevel: 'M'
    });

    let minutos
    let segundos

    function atualizarDisplay() {
        minutos = Math.floor(tempo / 60);
        segundos = tempo % 60;
        spn_timer_desktop.innerHTML = `<b>${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}</b>`;
    }

    atualizarDisplay();

    timer = setInterval(() => {
        tempo--;
        atualizarDisplay();
        if (tempo == 0) {
            clearInterval(timer);
            spn_timer_desktop.innerHTML = `<b style='color: #f80404'>${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}</b>`;
            fechar_timer = setInterval(() => {
                container_adquirir_planos_desktop.classList.add('d-none')
            }, 1000)
            return;
        }

    }, 1000);
}

gerarQRCodeAleatorioDesktop();

const btn_pagamento_desktop = document.getElementById('btn_pagamento_desktop')

btn_pagamento_desktop.addEventListener('click', function () {
    btn_pagamento_desktop.disabled = true;

    fetch("/empresa/vincularPlano", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idEmpresaServer: fk_empresa,
            idPlanoServer: planoEscolhido
        }),
    })
        .then((resposta) => {
            if (resposta.ok) {
                window.location = '../../Pages/login/login.html'
            } else {
                throw "Erro ao vincular plano";
            }
        })
        .catch((erro) => {
            console.log(`#ERRO: ${erro}`);
            alerta_erros_desktop.classList.remove('d-none');
            span_erro_desktop.innerText = 'Erro ao vincular plano, entre em contato com o suporte.';
        })
        .finally(() => {
            btn_pagamento_desktop.disabled = false;
        });
})

