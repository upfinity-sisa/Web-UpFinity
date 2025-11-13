const ipts_cnpj = document.querySelectorAll('.ipt_cnpj')
const ipts_cpf = document.querySelectorAll('.ipt_cpf')


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

ipts_cpf.forEach(input => {
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
