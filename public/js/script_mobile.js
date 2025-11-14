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