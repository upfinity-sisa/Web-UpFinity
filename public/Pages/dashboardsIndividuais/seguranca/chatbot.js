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

    input_agente.value = ""

    const tela = document.getElementById("mensagens");
    tela.scrollTo({
        top: tela.scrollHeight,
        behavior: "smooth"
    });

    setTimeout(() => {
        
        mensagens.innerHTML += `
        <div class="mensagem_bot">
            <div class="balao_mensagem_bot">
                <h1 style="color: rgb(255, 255, 255);" class="mensagem_txt">Olá usuário querido, nenhum dos seus ATMs está funcionando</h1>
            </div>
        </div>
        `
        
        tela.scrollTo({
            top: tela.scrollHeight,
            behavior: "smooth"
        });

        request_em_andamento = 0;


    }, 1000);


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