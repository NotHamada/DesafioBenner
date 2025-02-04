let currentTime = 0; // Tempo atual
let power = 10; // Potência (por padrão já vem 10)
let timer = null; // Timer 
let isPaused = false; // Está pausado ou não 
let isHeating = false; // Está aquecendo ou não
let progressInterval = null; // Intervalo de progresso

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

    if (time < 1 || time > 120) {
        alert('O tempo deve estar entre 1 e 120 segundos');
        return false;
    }

    if (power < 1 || power > 10) {
        alert('A potência deve estar entre 1 e 10');
        return false;
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
            const dots = '.'.repeat(power);
            progressElement.textContent += dots + ' ';
        }
    }, 1000);
}

// Função que faz o início rápido do microondas
function quickStart() {
    document.getElementById('timeInput').value = '30';
    document.getElementById('powerInput').value = '10';
    startHeating();
}

// Função de pausar/cancelar o aquecimento
function pauseOrCancel() {
    if (!isHeating && !isPaused) {
        clearInput();
        return;
    }

    if (isPaused) {
        stopHeating();
        clearInput();
        document.getElementById('display').textContent = '00:00';
        document.getElementById('heatingProgress').textContent = '';
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