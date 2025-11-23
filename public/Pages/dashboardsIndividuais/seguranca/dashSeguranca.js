var idATM = 1;
var conteudo = ""


function vwParaPx(vwValue) {
	const larguraViewport = window.innerWidth;
	const valorEmPx = (larguraViewport / 100) * vwValue;
	return Math.round(valorEmPx);
}

var options = {
	series: [{
		name: 'alertas',
		data: [0, 0, 0, 0, 0, 0, 0, 0]
	}],
	chart: {
		type: 'area'
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth'
	},
	xaxis: {
		categories: ["semana 1", "semana 2", "semana 3", "semana 4", "semana 5", "semana 6", "semana 7", "semana 8"]
	},
	tooltip: {
		x: {
			format: 'dd/MM/yy HH:mm'
		},
	},
	yaxis: {
		min: 0,
		max: 15,
		labels: {
			style: {
				fontSize: `${vwParaPx(0.8)}px`,
				fontFamily: "poppins leve",
			},
		},
	},
	colors: ["#00c7cd"],
};

var chart = new ApexCharts(document.querySelector("#graficoLinha"), options);
chart.render();

function buscar_dados_KPIinvasoes() {

    fetch(`/seguranca/exibirKPIinvasoes/${idATM}/${sessionStorage.FK_EMPRESA}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then(resposta2 => {
				exibirKPIinvasoes(resposta2)
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

function buscar_dados_grafico() {
	
	resposta3 = []
    fetch(`/seguranca/exibirGrafico/${idATM}/${sessionStorage.FK_EMPRESA}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then(resposta2 => {
				for (let i = 0; i < resposta2.length; i++) {
					resposta3.push(resposta2[i].total_alertas)
				}
				atualizar_grafico(resposta3)
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

function buscar_dados_portas_abertas() {

    fetch(`/seguranca/exibirPortasAbertas/${idATM}/${sessionStorage.FK_EMPRESA}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then(resposta2 => {
				exibirKPIconexoesSUS(resposta2)
				exibirListaConexoesAbertas(resposta2)
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

function buscar_dados_alertas() {

    fetch(`/seguranca/exibirAlertas/${idATM}/${sessionStorage.FK_EMPRESA}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then(resposta2 => {
				exibirAlertas(resposta2)
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

function buscar_dados_arquivos_criticos() {

    fetch(`/seguranca/exibirArquivosCriticos/${idATM}/${sessionStorage.FK_EMPRESA}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then(resposta2 => {
				exibirArquivosCriticos(resposta2)
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

function exibirKPIinvasoes(resposta2) {
	valor_kpi_invasao.innerHTML = resposta2.length

	tabela_invasoes.innerHTML = ""
	tabela_invasoes.innerHTML += `
	<tr>
		<th style="color: #268184;">IP do invasor</th>
		<th style="color: #268184;">Horário da tentativa</th>
	</tr>
	`
	for (let i = 0; i < resposta2.length; i++) {

		const dataFeia = resposta2[i].horarioInvasao;

		const data = new Date(dataFeia);

		const ano = data.getFullYear();
		const mes = String(data.getMonth() + 1).padStart(2, '0');
		const dia = String(data.getDate()).padStart(2, '0');

		const horas = String(data.getHours()).padStart(2, '0');
		const minutos = String(data.getMinutes()).padStart(2, '0');
		const segundos = String(data.getSeconds()).padStart(2, '0');

		const dataBonita = `${ano}-${mes}-${dia}, ${horas}:${minutos}:${segundos}`;

		tabela_invasoes.innerHTML += `
		<tr>
			<td>${resposta2[i].IP}</td>
			<td>${dataBonita}</td>
		</tr>
		`
	}

}

function exibirKPIconexoesSUS(resposta2) {

	if (resposta2.length == 0) {
		valor_kpi_conexoes.innerHTML = "0"
		valor_kpi_porta.innerHTML = "0"
		tabela_conexoes.innerHTML = ""
		return
	}

	var vt_nomes_iguais = [resposta2[0].portaLocal]
	var resposta3 = [resposta2[0]]

	for (let i = 0; i < resposta2.length; i++) {
		if (!vt_nomes_iguais.includes(resposta2[i].portaLocal)) {
			resposta3.push(resposta2[i])
			vt_nomes_iguais.push(resposta2[i].portaLocal)
		}
	}

	valor_kpi_porta.innerHTML = resposta3.length

	var conSus = 0;

	tabela_conexoes.innerHTML = ""
	tabela_conexoes.innerHTML += `
	<tr>
		<th style="color: #268184;">Porta Local</th>
		<th style="color: #268184;">IP da Conexão</th>
		<th>Verificar</th>
	</tr>
	`
	for (let i = 0; i < resposta3.length; i++) {


		if (resposta3[i].possuiAlerta == 1) {
			conSus++;

			tabela_conexoes.innerHTML += `
			<tr>
				<td>${resposta3[i].portaLocal}</td>
				<td>${resposta3[i].IPremoto}</td>
				<td><button onclick="declararConexaoSegura('${resposta3[i].portaLocal}', '${resposta3[i].IPremoto}')" class="botao_verificacao">Declarar Seguro</button></td>
			</tr>
			`

		} else {

			tabela_conexoes.innerHTML += `
			<tr>
				<td>${resposta3[i].portaLocal}</td>
				<td>${resposta3[i].IPremoto}</td>
				<td class="titulo_seguranca_tr">SEGURO</td>
			</tr>
			`

		}
	}

	valor_kpi_conexoes.innerHTML = conSus

}


function exibirListaConexoesAbertas(resposta2) {

	if (resposta2.length == 0) {
		lista_conexoes.innerHTML = ""
		return
	}

	var vt_nomes_iguais = [resposta2[0].portaLocal]
	var resposta3 = [resposta2[0]]

	for (let i = 0; i < resposta2.length; i++) {
		if (!vt_nomes_iguais.includes(resposta2[i].portaLocal)) {
			resposta3.push(resposta2[i])
			vt_nomes_iguais.push(resposta2[i].portaLocal)
		}
	}
	
	lista_conexoes.innerHTML = ""
	for (let i = 0; i < resposta3.length; i++) {
		lista_conexoes.innerHTML += `
		<div class="box_conexao">
			<h1 class="porta_conexao"> <b class="porta_local_lista">Porta Local:</b> ${resposta3[i].portaLocal}</h1>
			<h1 class="ip_conexao">${resposta3[i].IPremoto}</h1>
		</div>
 		`
	}

}

function exibirAlertas(resposta2) {

	lista_alertas.innerHTML = ""
	for (let i = 0; i < resposta2.length; i++) {

		const dataFeia = resposta2[i].horario;

		const data = new Date(dataFeia);

		const ano = data.getFullYear();
		const mes = String(data.getMonth() + 1).padStart(2, '0');
		const dia = String(data.getDate()).padStart(2, '0');

		const horas = String(data.getHours()).padStart(2, '0');
		const minutos = String(data.getMinutes()).padStart(2, '0');
		const segundos = String(data.getSeconds()).padStart(2, '0');

		const dataBonita = `${ano}/${mes}/${dia}, ${horas}:${minutos}:${segundos}`;

		lista_alertas.innerHTML += `
		<div class="box_alerta">
			<h3>${dataBonita}</h3>
			<div class="gravidade-alerta">
				<img src="../../../Assets/assets_dashboard/alertaAmarelo.png"
					alt="simbolo de alerta grave">
				<h1>ATENÇÃO</h1>
			</div>
			<div class="componente-alerta">
				<h4>${resposta2[i].mensagem}</h4>
			</div>
		</div> 
		`
	}

}

function exibirArquivosCriticos(resposta2) {

	lista_arquivos.innerHTML = ""
	for (let i = 0; i < resposta2.length; i++) {

		if (resposta2[i].possuiAlerta == 0) {

			lista_arquivos.innerHTML += `
			<div class="nome_arquivo">
				<h1 class="titulo-nome-arquivo">${resposta2[i].nome}</h1>
			</div>
			<div class="linha_arquivos"></div>
			`

		} else {

			lista_arquivos.innerHTML += `
			<div class="nome_arquivo_hover" onclick="mostrarModalArqs('${resposta2[i].nome}')">
				<h1 class="titulo-nome-arquivo">${resposta2[i].nome}</h1>
				<img class="img-arquivo" src="../../../Assets/assets_dashboard/alertaAmarelo.png">
			</div>
			<div class="linha_arquivos"></div>
			`

		}
	}

	exibirDadosSegurancaATM()

}

function mostrarModalArqs(nome) {
	dialog_arquivos.showModal()
	conteudo = nome
}

function atualizar_grafico(resposta2) {

	chart.updateSeries([
		{
			name: "alertas",
			data: resposta2
		}
	]);


}

function exibirDadosSegurancaATM() {

	fetch(`/seguranca/selecionarSeguranca/${idATM}/${sessionStorage.FK_EMPRESA}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then(resposta2 => {
				valor_kpi_seguranca.innerHTML = resposta2[0].seguranca
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}


function carregarInformacoes() {
	buscar_dados_KPIinvasoes()
	buscar_dados_portas_abertas()
	buscar_dados_arquivos_criticos()
	buscar_dados_alertas()
	buscar_dados_arquivos_criticos()
	buscar_dados_grafico()
	exibirDadosSegurancaATM()
}
carregarInformacoes()

function atualizar_dados() {
	setInterval(() => {
		carregarInformacoes()
	}, 20000);
}
atualizar_dados()


function declararSeguro() {
	
	fetch("/seguranca/salvarArquivoSalvo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
			idAtm: idATM,
            fkEmpresa: sessionStorage.FK_EMPRESA,
			conteudo01: conteudo,
        }),
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                console.log(resposta2)
				buscar_dados_arquivos_criticos()
				dialog_arquivos.close()
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

function declararConexaoSegura(porta, ip) {

	fetch("/seguranca/salvarConexaoSalva", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
			idAtm: idATM,
            fkEmpresa: sessionStorage.FK_EMPRESA,
			conteudo01: porta,
			conteudo02: ip,
        }),
    })
        .then(function (resposta) {
            resposta.json().then((resposta2) => {
                console.log(resposta2)
				buscar_dados_portas_abertas()
				dialog_conexao.close()
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
	
}


function buscarAtms() {

	fetch(`/seguranca/buscarAtms/${sessionStorage.FK_EMPRESA}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then(resposta2 => {
				
				comboATMs.innerHTML = ""

				for (let i = 0; i < resposta2.length; i++) {

					const option = document.createElement("option");
					option.value = resposta2[i].idAtm;
					option.textContent = `ATM ${resposta2[i].numeracao}`;
					comboATMs.appendChild(option);

				}

            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

buscarAtms()

function mudarATM() {

	idATM = comboATMs.value
	carregarInformacoes()

}