let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapsContainer = document.getElementById('laps');

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    let date = new Date(time);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    lapsContainer.innerHTML = '';
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);

const lapButton = document.getElementById('lap');

function addLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

lapButton.addEventListener('click', addLap);
