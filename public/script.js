const header_desktop = document.getElementById('header-desktop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header_desktop.style.height = "10vh"
    } else {
        header_desktop.style.height = "0"
    }
});