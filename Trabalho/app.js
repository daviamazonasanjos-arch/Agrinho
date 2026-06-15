// Variáveis do simulador interativo (pontuação do jogo)
let state = {
    sustentabilidade: 50,
    producao: 50
};

// Dados informativos sobre as regiões agrícolas do Brasil
const dadosRegioes = {
    sul: "Região Sul: Destaque na produção de grãos, suinocultura e avicultura, integrando forte cooperativismo com sistemas de plantio direto na palha.",
    sudeste: "Região Sudeste: Liderança na produção de café, cana-de-açúcar e citros, empregando alta tecnologia de automação industrial e irrigação.",
    centro: "Região Centro-Oeste: Fronteira agrícola massiva, impulsionando a produção nacional de soja e milho, com foco atual na expansão da Integração Lavoura-Pecuária-Floresta (ILPF).",
    norte: "Região Norte: A agricultura no Norte foca no extrativismo, no cultivo de subsistência e frutas típicas (açaí, mandioca), com forte expansão da soja.",
    nordeste: "Região Nordeste: No Nordeste, destaca-se a agricultura familiar, a fruticultura irrigada no semiárido e o agronegócio de grãos em expansão no MATOPIBA.",
};

// Função para alternar entre as abas (Tabs) do site
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(`tab-${tabId}`).classList.add('active');
    document.getElementById(`btn-${tabId}`).classList.add('active');
}

// Função para exibir as informações da região selecionada na tela
function showRegion(regionKey) {
    const display = document.getElementById('region-display');
    display.textContent = dadosRegioes[regionKey];
}


// Função para processar a escolha/ação do jogador no simulador
function runAction(actionType) {
    const feedback = document.getElementById('game-feedback');
    
    if (actionType === 'bio') {
        state.sustentabilidade = Math.min(100, state.sustentabilidade + 15);
        state.producao = Math.max(0, state.producao - 5);
        feedback.textContent = "Os bioinsumos melhoraram a saúde do solo e a sustentabilidade!";
    } else if (actionType === 'maq') {
        state.producao = Math.min(100, state.producao + 20);
        state.sustentabilidade = Math.max(0, state.sustentabilidade - 10);
        feedback.textContent = "O maquinário pesado acelerou a colheita, mas aumentou as emissões.";
    }
    

    // Atualiza a interface do jogo com os novos valores após a ação
    updateGameUI();
}


// Função para renderizar e atualizar as barras de progresso e textos do jogo
function updateGameUI() {
    document.getElementById('val-sust').textContent = state.sustentabilidade;
    document.getElementById('val-prod').textContent = state.producao;
    
    document.getElementById('bar-sust').style.width = `${state.sustentabilidade}%`;
    document.getElementById('bar-prod').style.width = `${state.producao}%`;
}


// Função para validar a resposta selecionada pelo usuário no Quiz
function checkQuiz() {
    const selectedOption = document.querySelector('input[name="q1"]:checked');
    const resultBox = document.getElementById('quiz-result');
    
    if (!selectedOption) {
        resultBox.style.display = 'block';
        resultBox.style.backgroundColor = '#e585a3';
        resultBox.style.color = '#120097';
        resultBox.textContent = "Por favor, selecione uma resposta.";
        return;
    }
    
    resultBox.style.display = 'block';
    if (selectedOption.value === "1") {
        resultBox.style.backgroundColor = '#05c030';
        resultBox.style.color = '#ffffff';
        resultBox.textContent = "Resposta Correta! A rotação e a ILPF promovem o equilíbrio ideal.";
    } else {
        resultBox.style.backgroundColor = '#e585a3';
        resultBox.style.color = '#120097';
        resultBox.textContent = "Alternativa incorreta. Tente analisar as práticas regenerativas.";
    }
}