contador = 1

for (let i = 1; i <= 15; i++) {

    num_cor = Math.floor(Math.random() * 3) + 1
    linha_wifi = `style="height: 50px; margin-right: 10px;" src="assets/simbolo_wifi.png"`

    if (num_cor == 1) {
        cor = "bolinha_verde"
    } else if (num_cor == 2) {
        cor = "bolinha_amarela"
    } else {
        cor = "bolinha_vermelha"
        linha_wifi = `style="height: 55px; margin-bottom: 5px; margin-right: 10px;" src="assets/simbolo_sem_wifi.png"`
    }

    centros.innerHTML += `
        <div class="visao_maquina">
            <div class="dentro_vm">
                <img class="img_atm" src="assets/simbolo_atm.png" alt="imagem ATM">
                <h1>ATM ${i}</h1>
                <img class="img_circulo" src="assets/${cor}.png" alt="símbolo verde">
            </div>
            <img ${linha_wifi}>
        </div>
    `

}