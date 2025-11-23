document.addEventListener('DOMContentLoaded', () => {

    let TOTAL_RAM = 0; 
    let maquinaAtual = 1;
    const maxPontos = 15;
    let labels = Array(maxPontos).fill('');
    let dataRam = Array(maxPontos).fill(0);

    const URL_BASE_API = "http://localhost:3333/ram"; 

    function updateKPIsTempoReal(currentUsagePercent) {
        const kpiRamDisponivel = document.getElementById('kpi-ram-disponivel');

        if (kpiRamDisponivel && TOTAL_RAM > 0) {
            const ramUsadaGB = (TOTAL_RAM * (currentUsagePercent / 100));
            const ramLivreGB = TOTAL_RAM - ramUsadaGB;
            kpiRamDisponivel.textContent = `${ramLivreGB.toFixed(1)} GB`;
        }
    }

    async function buscarDadosRamTempoReal() {
        if (maquinaAtual == 0) return;
        
        try {
            const response = await fetch(`${URL_BASE_API}/dados-ram/${maquinaAtual}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const dados = await response.json();
            
            labels = dados.dadosGrafico.map(d => d.momento);
            dataRam = dados.dadosGrafico.map(d => d.valor);
            graficoRam.data.labels = labels;
            graficoRam.data.datasets[0].data = dataRam;
            graficoRam.update();

            const valorAtual = dataRam[dataRam.length - 1] || 0; 

            updateProgressBar(valorAtual);
            updateKPIsTempoReal(valorAtual);

            document.getElementById('kpi-uso-medio').textContent = `${dados.usoMedioGB} GB`;
            document.getElementById('kpi-app-maior-uso').textContent = `${dados.nomeApp} (${dados.usoAppGB} GB)`;
            
        } catch (error) {
            console.error("Falha ao obter dados de RAM em tempo real:", error);
        }
    }
    
    async function buscarRamTotal() {
         try {
            const response = await fetch(`${URL_BASE_API}/ram-total/${maquinaAtual}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const dados = await response.json();
            TOTAL_RAM = dados.ramTotalGB || 16;
            console.log(`RAM Total definida como: ${TOTAL_RAM} GB`);

        } catch (error) {
            console.error("Falha ao obter RAM Total:", error);
            TOTAL_RAM = 16;
        }
    }

    async function buscarKPIsEstaticos() {
    }


    function carregarTodosDados() {
        dataRam.fill(0);
        labels.fill('');
        graficoRam.update();
        buscarRamTotal(); 
        buscarDadosRamTempoReal(); 
    }

    carregarTodosDados();
    setInterval(buscarDadosRamTempoReal, 2000);
});