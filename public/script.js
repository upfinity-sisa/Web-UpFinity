const header_desktop = document.getElementById('header-desktop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header_desktop.style.background = "#1a1a1a"
        header_desktop.style.boxShadow = " 0 8px 20px rgba(0, 0, 0, 0.445);"

    } else {
        header_desktop.style.background = "Transparent"
        header_desktop.style.boxShadow = "none"
    }
});

// Containers de navegação
const containerInicio_Desktop = document.getElementById('container_inicial_desktop')
const containerOqueFazemos_Desktop = document.getElementById('container_oque_fazemos_desktop')
const containerDiferencial_Desktop = document.getElementById('container_diferencial-desktop')
const container_fluxo_Desktop = document.getElementById('container_fluxo_desktop')


// Header
const aInicioHeader_Desktop = document.getElementById('aInicioHeader_Desktop')
aInicioHeader_Desktop.addEventListener('click', function () {
    containerInicio_Desktop.scrollIntoView({ block: "center", behavior: "smooth" })
})

const aBeneficioHeader_Desktop = document.getElementById('aBeneficioHeader_Desktop')
aBeneficioHeader_Desktop.addEventListener('click', function () {
    containerOqueFazemos_Desktop.scrollIntoView({ block: "start", behavior: "smooth" })
})


const aDiferencialHeader_Desktop = document.getElementById('aDiferencialHeader_Desktop')
aDiferencialHeader_Desktop.addEventListener('click', function () {
    containerDiferencial_Desktop.scrollIntoView({ block: "start", behavior: "smooth" })
})


const aFluxoHeader_Desktop = document.getElementById('aFluxoHeader_Desktop')
aFluxoHeader_Desktop.addEventListener('click', function () {
    container_fluxo_Desktop.scrollIntoView({ block: "start", behavior: "smooth" })
})

// Footer
const aInicioFooter_Desktop = document.getElementById('aInicioFooter_Desktop')
aInicioFooter_Desktop.addEventListener('click', function () {
    containerInicio_Desktop.scrollIntoView({ block: "center", behavior: "smooth" })
})

const aBeneficiosFooter_Desktop = document.getElementById('aBeneficiosFooter_Desktop')
aBeneficiosFooter_Desktop.addEventListener('click', function () {
    containerOqueFazemos_Desktop.scrollIntoView({ block: "start", behavior: "smooth" })
})

const aDiferencialFooter_Desktop = document.getElementById('aDiferencialFooter_Desktop')
aDiferencialFooter_Desktop.addEventListener('click', function () {
    containerDiferencial_Desktop.scrollIntoView({ block: "start", behavior: "smooth" })
})

const aFluxoFooter_Desktop = document.getElementById('aFluxoFooter_Desktop')
aFluxoFooter_Desktop.addEventListener('click', function () {
    container_fluxo_Desktop.scrollIntoView({ block: "start", behavior: "smooth" })
})