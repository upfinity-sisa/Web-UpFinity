function exibirATM() {

    for (let i = 0; i < 12; i++) {

        baixo_gestao.innerHTML += `
    
            <div class="caixa_gestao">
                <div class="infos_atms">
                    <div class="informacoes informacoes-extensao-atms">
                        <div class="titulos">
                            <h1>Numeração:</h1>
                            <h1>Status:</h1>
                        </div>
                        <div class="infos">
                            <h1>ATM ${i+1}</h1>
                            <h1>Ativo</h1>
                        </div>
                    </div>
                    <div class="combo_status">
                        <h1>Definir novo Status</h1>
                        <select class="inputs">
                            <option>ATIVO</option>
                            <option>INATIVO</option>
                            <option>EM MANUTENÇÃO</option>
                        </select>
                    </div>
                </div>
                <div class="botoes">
                    <button class="btn_promover">Alterar</button>
                    <button class="btn_remover">Remover</button>
                </div>
            </div>

        `

    }
}

exibirATM()