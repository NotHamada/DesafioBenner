let currentTime = 0; // Tempo atual
let power = 10; // Potência (por padrão já vem 10)
let timer = null; // Timer 
let isPaused = false; // Está pausado ou não 
let isHeating = false; // Está aquecendo ou não
let progressInterval = null; // Intervalo de progresso
let isPredefinition = false; // Verificação se é predefinição
let symbol = '.' // Símbolo base
let instructions = '';

// Função que faz as predefinições
function setPredefinition(predifinition) {
    switch (predifinition) {
        case 1:
            timer = 180;
            power = 7;
            symbol = 'P';
            instructions = 'Observar o barulho de estouros do milho, caso houver um intervalo de mais de 10 segundos entre um estouro e outro, interrompa o aquecimento.';
            break;
        case 2:
            timer = 300;
            power = 5;
            symbol = 'L';
            instructions = 'Cuidado com aquecimento de líquidos, o choque térmico aliado ao movimento do recipiente pode causar fervura imediata causando risco de queimaduras.';
            break;
        case 3:
            timer = 840;
            power = 4;
            symbol = 'C';
            instructions = 'Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para o descongelamento uniforme.';
            break;
        case 4:
            timer = 480;
            power = 7;
            symbol = 'Fr';
            instructions = ' Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para o descongelamento uniforme.';
            break;
        case 5:
            timer = 480;
            power = 9;
            symbol = 'Fe';
            instructions = 'Deixe o recipiente destampado e em casos de plástico, cuidado ao retirar o recipiente pois o mesmo pode perder resistência em altas temperaturas.';
            break;
    }

    document.getElementById('timeInput').value = `${timer}`;
    document.getElementById('powerInput').value = `${power}`;

    document.getElementById('instructions').setAttribute('style', 'display:block');
    document.getElementById('instructions').textContent = instructions;
    document.getElementById('timeInput').setAttribute('style', 'pointer-events: none; background-color: #808080');
    document.getElementById('powerInput').setAttribute('style', 'pointer-events: none; background-color: #808080');

    isPredefinition = true;
}

// Função de adição de tempo
function addNumber(num) {
    const timeInput = document.getElementById('timeInput');
    timeInput.value = (timeInput.value || '') + num;
}

// Função que limpa o input
function clearInput() {
    document.getElementById('timeInput').value = '';
    document.getElementById('powerInput').value = '10';
}

// Função que faz a validação dos inputs (entre 1 e 120 segundos)
function validateInputs() {
    const time = parseInt(document.getElementById('timeInput').value);
    const power = parseInt(document.getElementById('powerInput').value);

    if (!isPredefinition) {
        if (time < 1 || time > 120) {
            alert('O tempo deve estar entre 1 e 120 segundos');
            return false;
        }

        if (power < 1 || power > 10) {
            alert('A potência deve estar entre 1 e 10');
            return false;
        }
    }

    return true;
}

// Função que formata o tempo (o tempo é recebido em segundos, formatado para aparecer em minutos e segundos) 
function formatTime(seconds) {
    if (seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `0:${seconds.toString().padStart(2, '0')}`;
}

// Função que começa o funcionamento do microondas
function startHeating() {
    if (isHeating && !isPaused) {
        currentTime += 30;
        return;
    }

    if (!isPaused) {
        if (!validateInputs()) return;

        currentTime = parseInt(document.getElementById('timeInput').value);
        power = parseInt(document.getElementById('powerInput').value) || 10;
    }

    isPaused = false;
    isHeating = true;

    timer = setInterval(() => {
        currentTime--;
        document.getElementById('display').textContent = formatTime(currentTime);

        if (currentTime <= 0) {
            stopHeating();
            document.getElementById('heatingProgress').textContent += ' Aquecimento concluído';
        }
    }, 1000);

    updateHeatingProgress();
}

// Função que atualiza o progresso de aquecimento
function updateHeatingProgress() {
    const progressElement = document.getElementById('heatingProgress');
    progressElement.textContent = '';

    progressInterval = setInterval(() => {
        if (!isPaused) {
            const dots = symbol.repeat(power);
            progressElement.textContent += dots + ' ';
        }
    }, 1000);
}

// Função que faz o início rápido do microondas
function quickStart() {
    if (!isPredefinition) {
        document.getElementById('timeInput').value = '30';
        document.getElementById('powerInput').value = '10';
        startHeating();
    }
}

// Função de pausar/cancelar o aquecimento
function pauseOrCancel() {
    if (!isHeating && !isPaused) {
        clearInput();

        document.getElementById('instructions').setAttribute('style', 'display:none');
        document.getElementById('instructions').textContent = instructions;
        document.getElementById('timeInput').setAttribute('style', '');
        document.getElementById('powerInput').setAttribute('style', '');
        symbol = '.'

        return;
    }

    if (isPaused) {
        stopHeating();
        clearInput();
        document.getElementById('display').textContent = '00:00';
        document.getElementById('heatingProgress').textContent = '';

        symbol = '.';
        isPredefinition = false;
        document.getElementById('instructions').setAttribute('style', 'display:none');
        document.getElementById('instructions').textContent = instructions;
        document.getElementById('timeInput').setAttribute('style', '');
        document.getElementById('powerInput').setAttribute('style', '');
    } else {
        clearInterval(timer);
        clearInterval(progressInterval);
        isPaused = true;
    }
}

// Função de parada do microondas
function stopHeating() {
    clearInterval(timer);
    clearInterval(progressInterval);
    isHeating = false;
    isPaused = false;
}

