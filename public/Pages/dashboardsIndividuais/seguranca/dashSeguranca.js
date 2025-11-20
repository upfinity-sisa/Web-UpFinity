var idATM = 1;
var segurancaDash = 0;

function vwParaPx(vwValue) {
	const larguraViewport = window.innerWidth;
	const valorEmPx = (larguraViewport / 100) * vwValue;
	return Math.round(valorEmPx);
}

var options = {
	series: [{
		name: 'alertas',
		data: [2, 3, 4, 4, 6, 5, 9, 11]
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

function buscar_dados_portas_abertas() {

    fetch(`/seguranca/exibirPortasAbertas/${idATM}/${sessionStorage.FK_EMPRESA}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then(resposta2 => {
				exibirKPIportas(resposta2)
				exibirKPIconexoesSUS(resposta2)
				exibirListaConexoesAbertas(resposta2)
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

function buscar_dados_conexoes_suspeitas() {

    fetch(`/seguranca/exibirKPIconexoesSUS/${idATM}/${sessionStorage.FK_EMPRESA}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then(resposta2 => {
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

function exibirKPIportas(resposta2) {
	valor_kpi_porta.innerHTML = resposta2.length
}

function exibirKPIconexoesSUS(resposta2) {

	var conSus = 0;

	tabela_conexoes.innerHTML = ""
	tabela_conexoes.innerHTML += `
	<tr>
		<th style="color: #268184;">Porta Local</th>
		<th style="color: #268184;">IP da Conexão</th>
		<th>Verificar</th>
	</tr>
	`
	for (let i = 0; i < resposta2.length; i++) {

		segurancaDash++;

		if (resposta2[i].fkAlertaSeguranca != null) {
			conSus++;

			tabela_conexoes.innerHTML += `
			<tr>
				<td>${resposta2[i].portaLocal}</td>
				<td>${resposta2[i].IPremoto}</td>
				<td><button class="botao_verificacao">Declarar Seguro</button></td>
			</tr>
			`

		} else {

			tabela_conexoes.innerHTML += `
			<tr>
				<td>${resposta2[i].portaLocal}</td>
				<td>${resposta2[i].IPremoto}</td>
				<td class="titulo_seguranca_tr">SEGURO</td>
			</tr>
			`

		}
	}

	valor_kpi_conexoes.innerHTML = conSus

}


function exibirListaConexoesAbertas(resposta2) {
	
	lista_conexoes.innerHTML = ""
	for (let i = 0; i < resposta2.length; i++) {
		lista_conexoes.innerHTML += `
		<div class="box_conexao">
			<h1 class="porta_conexao"> <b class="porta_local_lista">Porta Local:</b> ${resposta2[i].portaLocal}</h1>
			<h1 class="ip_conexao">${resposta2[i].IPremoto}</h1>
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

		if (resposta2[i].fkAlertaSeguranca == null) {

			lista_arquivos.innerHTML += `
			<div class="nome_arquivo">
				<h1 class="titulo-nome-arquivo">${resposta2[i].nome}</h1>
			</div>
			<div class="linha_arquivos"></div>
			`

		} else {

			segurancaDash++;

			lista_arquivos.innerHTML += `
			<div class="nome_arquivo">
				<h1 class="titulo-nome-arquivo">${resposta2[i].nome}</h1>
				<img onclick="dialog_arquivos.showModal()" class="img-arquivo" src="../../../Assets/assets_dashboard/alertaAmarelo.png">
			</div>
			<div class="linha_arquivos"></div>
			`

		}
	}

	exibirDadosSegurancaATM()

}

function exibirDadosSegurancaATM() {
	if (segurancaDash> 0) {
		valor_kpi_seguranca.innerHTML="INSEGURO"
	} else {
		valor_kpi_seguranca.innerHTML="SEGURO"
	}
	segurancaDash = 0;
}


function carregarInformacoes() {
	buscar_dados_KPIinvasoes()
	buscar_dados_portas_abertas()
	buscar_dados_arquivos_criticos()
	buscar_dados_conexoes_suspeitas()
	buscar_dados_alertas()
	buscar_dados_arquivos_criticos()
}
carregarInformacoes()