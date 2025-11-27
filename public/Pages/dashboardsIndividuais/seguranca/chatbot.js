var reiniciar = 1;
var request_em_andamento = 0;



function conversar() {

    if (input_agente.value == "") {
        return
    }

    if (request_em_andamento) {
        return
    }

    request_em_andamento = 1;

    if (reiniciar) {
        conteudo_agente.innerHTML = `
            <div id="mensagens"></div>
        `
    }
    reiniciar = 0

    mensagens.innerHTML += `
        <div class="mensagem_usuario">
            <div class="balao_mensagem_usuario">
                <h1 style="color: #666666;"  class="mensagem_txt">${input_agente.value}</h1>
            </div>
        </div>
    `

    enviarMensagemParaAgente(input_agente.value)

    input_agente.value = ""

    const tela = document.getElementById("mensagens");
    tela.scrollTo({
        top: tela.scrollHeight,
        behavior: "smooth"
    });

    tela.scrollTo({
        top: tela.scrollHeight,
        behavior: "smooth"
    });


}

async function enviarMensagemParaAgente(texto) {
    let data = null
    try {
        const resp = await fetch("/3.212.222.224:8000/agente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                texto: texto,
                idUsuario: sessionStorage.ID_USUARIO,
                nome: sessionStorage.NOME_USUARIO,
                email: sessionStorage.EMAIL_USUARIO,
                cpf: sessionStorage.CPF_USUARIO,
                fkEmpresa: sessionStorage.FK_EMPRESA,
                fkTipoUsuario: sessionStorage.FK_TIPOUSUARIO
            })
        });
        data = await resp.json();
        console.log("Resposta do agente:", data.resposta);
    } catch (err) {
        console.log("encontrei um erro: ", err)
        mensagens.innerHTML += `
        <div class="mensagem_bot">
            <div class="balao_mensagem_bot">
                <h1 style="color: rgb(255, 255, 255);" class="mensagem_txt">Ops, houve um erro ao estabelecer conexão com o UpStuart, volte novamente mais tarde</h1>
            </div>
        </div>
        `
        return
    }

    if (data.tipo == "df") {
        valoresTabela = Object.keys(data.resposta[0])
        console.log(valoresTabela[0])

        let tr_agente = ""
        for (let i = 0; i < valoresTabela.length; i++) {
            tr_agente += `
            <th>${valoresTabela[i]}</th>
            `
        }

        let tabela_agente = ""
        for (let i = 0; i < (data.resposta).length; i++) {
            var linha = ``
            for (let x = 0; x < valoresTabela.length; x++) {
                linha += `<td>${data.resposta[i][valoresTabela[x]]}</td>`
            }
            tabela_agente += `
            <tr>
            ${linha}
            </tr>
            `
        }

        mensagens.innerHTML += `
        <div class="mensagem_bot">

            <div class="balao_mensagem_bot">

                <table style="background-color: white;">
                <tr>
                    ${tr_agente}
                </tr>
                ${tabela_agente}
                </table>

            </div>
        </div>
        `
    } else {
        let splittedResposta = data.resposta.split("\n")
        let respHtml = ""
        for (let i = 0; i < splittedResposta.length; i++) {
            if (splittedResposta[i].trim() !== "") {
                respHtml += `<p>${splittedResposta[i]}</p>`
            }
        }
        mensagens.innerHTML += `
        <div class="mensagem_bot">
            <div class="balao_mensagem_bot">
                <h1 style="color: rgb(255, 255, 255);" class="mensagem_txt">${respHtml}</h1>
            </div>
        </div>
        `
    }

    request_em_andamento = 0;

    /*
    tela.scrollTo({
        top: tela.scrollHeight,
        behavior: "smooth"
    });
    */

}


function abrirChatBot() {
    exibir_bot.innerHTML = `
    
    <div id="fundo_tela_cheia">
        <div id="modal_upstuart">
            <div id="titulo_agente">
                <h1 id="titulo_upstuart">UpStuart</h1>
                <img id="simbolo_ia" src="../../../Assets/assets_dashboard/AIsimble.png">
            </div>
            <div id="conteudo_agente">
                <h1 id="mensagem_conteudo">Olá, ${sessionStorage.NOME_USUARIO}<b id="emoji">👋<b></h1>
            </div>
            <div id="pergunta_agente">
                <input id="input_agente" type="text" placeholder="Pergunte ao UpStuart...">
                <img onclick="conversar()" id="iconeMensagem" src="../../../Assets/assets_dashboard/iconeMensagem.png">
            </div>
        </div>
    </div>

    `

    const fundo = document.getElementById("fundo_tela_cheia");
    const modal = document.getElementById("modal_upstuart");

    fundo.addEventListener("click", (e) => {
        if (!modal.contains(e.target)) {
            exibir_bot.innerHTML = ""
            reiniciar = 1
        }

    });

    const input = document.getElementById("input_agente")

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            conversar();
        }
    });

}