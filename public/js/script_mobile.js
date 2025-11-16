const container_menu_mobile = document.getElementById('container_menu_mobile')
const btn_header_menu_mobile = document.getElementById('header_menu_mobile')

function AbrirMenuMobile() {
    container_menu_mobile.style.height = '90vh';
    container_menu_mobile.style.borderBottomLeftRadius = '0';
    container_menu_mobile.style.borderBottomRightRadius = '0';

    btn_header_menu_mobile.src = './Assets/Elements/Icons/fecharMenu.png'
}

function FecharMenuMobile() {
    container_menu_mobile.style.height = '0vh';
    container_menu_mobile.style.borderBottomLeftRadius = '50%';
    container_menu_mobile.style.borderBottomRightRadius = '50%';
    btn_header_menu_mobile.src = './Assets/Elements/Icons/menuHamburguer.png'
}

btn_header_menu_mobile.addEventListener('click', function () {
    const altura = getComputedStyle(container_menu_mobile).height;
    if (altura === '0px') {
        AbrirMenuMobile()
    }
    else {
        FecharMenuMobile()
    }
})

const containerInicio_Mobile = document.getElementById('container_inicial_mobile')

const aInicioHeader_Mobile = document.getElementById('aInicioHeader_Mobile')
const aInicioFooter_Mobile = document.getElementById('aInicioFooter_Mobile')

aInicioHeader_Mobile.addEventListener('click', function () {
    containerInicio_Mobile.scrollIntoView({ block: "center", behavior: "smooth" })
    FecharMenuMobile()
})

aInicioFooter_Mobile.addEventListener('click', function () {
    containerInicio_Mobile.scrollIntoView({ block: "center", behavior: "smooth" })
    FecharMenuMobile()
})


const containerBeneficios_Mobile = document.getElementById('container_oque_fazemos_mobile')

const aBeneficioHeader_Mobile = document.getElementById('aBeneficioHeader_Mobile')
const aBeneficiosFooter_Mobile = document.getElementById('aBeneficiosFooter_Mobile')

aBeneficioHeader_Mobile.addEventListener('click', function () {
    containerBeneficios_Mobile.scrollIntoView({ block: "start", behavior: "smooth" })
    FecharMenuMobile()
})

aBeneficiosFooter_Mobile.addEventListener('click', function () {
    containerBeneficios_Mobile.scrollIntoView({ block: "start", behavior: "smooth" })
    FecharMenuMobile()
})

const containerDiferencial_Mobile = document.getElementById('container_diferencial-mobile')

const aDiferencialHeader_Mobile = document.getElementById('aDiferencialHeader_Mobile')
const aDiferencialFooter_Mobile = document.getElementById('aDiferencialFooter_Mobile')

aDiferencialHeader_Mobile.addEventListener('click', function () {
    containerDiferencial_Mobile.scrollIntoView({ block: "start", behavior: "smooth" })
    FecharMenuMobile()
})

aDiferencialFooter_Mobile.addEventListener('click', function () {
    containerDiferencial_Mobile.scrollIntoView({ block: "start", behavior: "smooth" })
    FecharMenuMobile()
})

const containerFluxo_Mobile = document.getElementById('container_fluxo_mobile')

const aFluxoHeader_Mobile = document.getElementById('aFluxoHeader_Mobile')
const aFluxoFooter_Mobile = document.getElementById('aFluxoFooter_Mobile')

aFluxoHeader_Mobile.addEventListener('click', function () {
    containerFluxo_Mobile.scrollIntoView({ block: "start", behavior: "smooth" })
    FecharMenuMobile()
})

aFluxoFooter_Mobile.addEventListener('click', function () {
    containerFluxo_Mobile.scrollIntoView({ block: "start", behavior: "smooth" })
    FecharMenuMobile()
})

