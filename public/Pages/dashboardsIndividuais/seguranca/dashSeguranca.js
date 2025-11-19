var idATM = 1;

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

lista_alertas.innerHTML = ""
for (let i = 0; i < 6; i++) {
	lista_alertas.innerHTML += `
    <div class="box_alerta">
        <h3>2025-03-02 10:22:04</h3>
        <div class="gravidade-alerta">
            <img src="../../../Assets/assets_dashboard/alertaAmarelo.png"
                alt="simbolo de alerta grave">
            <h1>CRÍTICO</h1>
        </div>
        <div class="componente-alerta">
            <h4>Tentativa de conexão suspeita vinda do IP: 127.0.0.1</h4>
        </div>
    </div> 
    `
}

lista_conexoes.innerHTML = ""
for (let i = 0; i < 15; i++) {
	lista_conexoes.innerHTML += `
		<div class="box_conexao">
			<h1 class="porta_conexao">3333</h1>
			<h1 class="pipe_conexao">|</h1>
			<h1 class="ip_conexao">127.0.0.1</h1>
		</div>
  `
}


lista_arquivos.innerHTML = ""
for (let i = 0; i < 20; i++) {

	alerta = Math.floor(Math.random() * 10)

	if (alerta > 7) {
		lista_arquivos.innerHTML += `
		<div class="nome_arquivo">
			<h1 class="titulo-nome-arquivo">/bin/netstat</h1>
			<img onclick="dialog_arquivos.showModal()" class="img-arquivo" src="../../../Assets/assets_dashboard/alertaAmarelo.png">
		</div>
		<div class="linha_arquivos"></div>
  		`
	}

	lista_arquivos.innerHTML += `
		<div class="nome_arquivo">
			<h1 class="titulo-nome-arquivo">/bin/netstat</h1>
		</div>
		<div class="linha_arquivos"></div>
  	`
}

function buscar_dados_KPIinvasoes() {

    fetch(`/seguranca/exibirKPIinvasoes/${idATM}`, {
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

function buscar_dados_KPIarquivos() {

    fetch(`/seguranca/exibirKPIarquivos/${idATM}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then(resposta2 => {
				exibirKPIarquivos(resposta2)
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

function buscar_dados_portas_abertas() {

    fetch(`/seguranca/exibirPortasAbertas/${idATM}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then(resposta2 => {
                console.log(resposta2)
				exibirKPIportas(resposta2)
            })
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

function buscar_dados_conexoes_suspeitas() {

    fetch(`/seguranca/exibirKPIconexoesSUS/${idATM}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then(resposta2 => {
                console.log(resposta2)
				exibirKPIconexoesSUS(resposta2)
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

function exibirKPIarquivos(resposta2) {
	valor_kpi_arquivo.innerHTML = resposta2.length

	tabela_arquivos.innerHTML = ""
	tabela_arquivos.innerHTML += `
	<tr>
		<th style="color: #268184;">Caminho do arquivo</th>
		<th>Verificar</th>
	</tr>
	`
	for (let i = 0; i < resposta2.length; i++) {

		tabela_arquivos.innerHTML += `
		<tr>
			<td>${resposta2[i].nome}</td>
			<td><button class="botao_verificacao">Declarar Seguro</button></td>
		</tr>
		`
	}

}

function exibirKPIportas(resposta2) {
	valor_kpi_porta.innerHTML = resposta2.length

	tabela_portas.innerHTML = ""
	tabela_portas.innerHTML += `
	<tr>
		<th style="color: #268184;">Portas</th>
	</tr>
	`
	for (let i = 0; i < resposta2.length; i++) {

		tabela_portas.innerHTML += `
		<tr>
			<td>${resposta2[i].portaLocal}</td>
		</tr>
		`
	}

}

function exibirKPIconexoesSUS(resposta2) {
	valor_kpi_conexoes.innerHTML = resposta2.length

	tabela_conexoes.innerHTML = ""
	tabela_conexoes.innerHTML += `
	<tr>
		<th style="color: #268184;">Porta Local</th>
		<th style="color: #268184;">IP da Conexão</th>
		<th>Verificar</th>
	</tr>
	`
	for (let i = 0; i < resposta2.length; i++) {

		tabela_conexoes.innerHTML += `
		<tr>
			<td>${resposta2[i].portaLocal}</td>
			<td>${resposta2[i].IPremoto}</td>
			<td><button class="botao_verificacao">Declarar Seguro</button></td>
		</tr>
		`
	}

}

function carregarInformacoes() {
	buscar_dados_KPIinvasoes()
	buscar_dados_KPIarquivos()
	buscar_dados_portas_abertas()
	buscar_dados_conexoes_suspeitas()
}
carregarInformacoes()