document.addEventListener('DOMContentLoaded', () => {

	const TOTAL_RAM = 16;
	let maquinaAtual = 1;
	const maxPontos = 15;
	let labels = Array(maxPontos).fill('');
	let dataRam = Array(maxPontos).fill(0);

	const chartFontColor = '#000000ff';
	const chartGridColor = 'rgba(0, 0, 0, 0.2)';

	const ctxUsoAtual = document.getElementById('grafico-uso-atual').getContext('2d');

	const graficoRam = new Chart(ctxUsoAtual, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [{
				label: 'Uso de RAM (%)',
				data: dataRam,
				borderColor: 'var(--cor-destaque)',
				backgroundColor: 'rgba(86, 122, 180, 0.2)',
				fill: true,
				tension: 0.3,
				borderWidth: 2,
				pointBackgroundColor: 'var(--cor-texto)',
				pointRadius: 3
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			animation: { duration: 500 },
			scales: {
				x: {
					grid: { color: chartGridColor, drawBorder: false },
					ticks: { display: false }
				},
				y: {
					grid: { color: chartGridColor, drawBorder: false },
					ticks: { color: chartFontColor, callback: (value) => value + '%' },
					beginAtZero: true,
					max: 100
				}
			},
			plugins: {
				legend: { display: false },
				tooltip: {
					callbacks: { label: (context) => ` Uso: ${context.raw}%` }
				}
			}
		}
	});

	function updateProgressBar(percentage) {
		const progressBar = document.getElementById('progressBar');
		const progressValue = document.getElementById('progressValue');

		if (!progressBar || !progressValue) return;

		const limitedPercentage = Math.min(100, Math.max(0, percentage));

		progressBar.style.width = `${limitedPercentage}%`;
		progressValue.textContent = `${limitedPercentage.toFixed(1)}%`;

		progressBar.classList.remove('verde', 'amarelo', 'vermelho');

		if (limitedPercentage <= 69) {
			progressBar.classList.add('verde');
		} else if (limitedPercentage <= 85) {
			progressBar.classList.add('amarelo');
		} else {
			progressBar.classList.add('vermelho');
		}
	}

	function updateKPIsTempoReal(currentUsagePercent) {
		const kpiRamDisponivel = document.getElementById('kpi-ram-disponivel');

		if (kpiRamDisponivel) {
			const ramUsadaGB = (TOTAL_RAM * (currentUsagePercent / 100));
			const ramLivreGB = TOTAL_RAM - ramUsadaGB;
			kpiRamDisponivel.textContent = `${ramLivreGB.toFixed(1)} GB`;
		}
	}

	async function buscarDadosRamTempoReal() {
		try {
			const valorAtual = Math.floor(Math.random() * 100);
			const momento = new Date();
			const horaAtual = momento.toLocaleTimeString();

			labels.shift();
			dataRam.shift();
			labels.push(horaAtual);
			dataRam.push(valorAtual);
			graficoRam.update();
			updateProgressBar(valorAtual);
			updateKPIsTempoReal(valorAtual);

		} catch (error) {
			console.error("Falha ao obter dados de RAM em tempo real:", error);
		}
	}

	async function buscarKPIsEstaticos() {
		try {
			const usoMedioGB = (Math.random() * (TOTAL_RAM * 0.5) + (TOTAL_RAM * 0.1)).toFixed(1);
			const appMaisUsada = { nome: 'Chrome', usoGB: (Math.random() * (TOTAL_RAM * 0.2) + 0.5).toFixed(1) };

			document.getElementById('kpi-uso-medio').textContent = `${usoMedioGB} GB`;
			document.getElementById('kpi-app-maior-uso').textContent = `${appMaisUsada.nome} (${appMaisUsada.usoGB} GB)`;

		} catch (error) {
			console.error("Falha ao obter KPIs estáticos:", error);
		}
	}


	function carregarTodosDados() {
		dataRam.fill(0);
		labels.fill('');
		graficoRam.update();
		buscarKPIsEstaticos();
	}

	const btnMaquinas = document.getElementById('btn-maquinas');
	const listaMaquinas = document.getElementById('menu-maquinas');

	if (btnMaquinas && listaMaquinas) {
		btnMaquinas.addEventListener('click', (e) => {
			e.stopPropagation();
			listaMaquinas.style.display = listaMaquinas.style.display === 'block' ? 'none' : 'block';
		});

		const botoes = listaMaquinas.querySelectorAll('button');
		botoes.forEach(btn => {
			btn.addEventListener('click', () => {
				maquinaAtual = btn.getAttribute('data-target');
				btnMaquinas.textContent = btn.textContent;
				listaMaquinas.style.display = 'none';
				carregarTodosDados();
			});
		});

		document.addEventListener('click', () => {
			listaMaquinas.style.display = 'none';
		});
	}
	carregarTodosDados();
	setInterval(buscarDadosRamTempoReal, 2000);

});