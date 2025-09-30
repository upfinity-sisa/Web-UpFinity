const header_desktop = document.getElementById('header-desktop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header_desktop.style.height = "10vh"
    } else {
        header_desktop.style.height = "0"
    }
});

const aInicioHeader_Desktop = document.getElementById('aInicioHeader_Desktop')
const containerInicio_Desktop = document.getElementById('container_inicial_desktop')

aInicioHeader_Desktop.addEventListener('click', function () {
    containerInicio_Desktop.scrollIntoView({ block: "center", behavior: "smooth" })
})

const aBeneficioHeader_Desktop = document.getElementById('aBeneficioHeader_Desktop')
const containerOqueFazemos_Desktop = document.getElementById('container_oque_fazemos_desktop')

aBeneficioHeader_Desktop.addEventListener('click', function () {
    containerOqueFazemos_Desktop.scrollIntoView({ block: "start", behavior: "smooth" })
})

const aDiferencialHeader_Desktop = document.getElementById('aDiferencialHeader_Desktop')
const containerDiferencial_Desktop = document.getElementById('container_diferencial-desktop')

aDiferencialHeader_Desktop.addEventListener('click', function () {
    containerDiferencial_Desktop.scrollIntoView({ block: "start", behavior: "smooth" })
})

const aFluxoHeader_Desktop = document.getElementById('aFluxoHeader_Desktop')
const container_fluxo_Desktop = document.getElementById('container_fluxo_desktop')

aFluxoHeader_Desktop.addEventListener('click', function () {
    container_fluxo_Desktop.scrollIntoView({ block: "start", behavior: "smooth" })
})