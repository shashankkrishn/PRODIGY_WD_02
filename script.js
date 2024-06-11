const timer = document.getElementById('timer');
const reset_lap = document.getElementById('reset_lap');
const start_stop = document.getElementById('start_stop');
const lapButton = document.getElementById('laps');

let startTime = 0;
let prevelapsedTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let reset = true;
function start_stopTimer() {
    reset = false;
    if (running) {
        running = false;
        start_stop.textContent = "Start";
        start_stop.style.backgroundColor = "#008D09";
        reset_lap.textContent = "Reset";
        reset_lap.style.backgroundColor = "#C61919";
        stopTimer();
    } else {
        running = true;
        start_stop.textContent = "Stop";
        start_stop.style.backgroundColor = "#1c2834";
        reset_lap.textContent = "Lap";
        reset_lap.style.backgroundColor = "#4d5053";
        reset_lap.style.height = window.getComputedStyle(start_stop).height;
        reset_lap.style.width = window.getComputedStyle(start_stop).width;
        reset_lap.style.margin = "1rem";
        startTimer();
    }
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime
        timer.textContent = formatTimer(elapsedTime);
    }, 10)
}

function reset_lapTimer() {
    if (running) {
        document.querySelector('.small').style.height = '50vh';
        lapTimer();
    } else {
        document.querySelector('.small').style.height = '0';
        resetTimer();
    }
}

function stopTimer() {
    clearInterval(timerInterval);
}

function lapTimer() {
    const newNode = document.createElement("li");
    let temp = "+" + "<span style='color: #eaf6ff41;'>" + formatTimer(elapsedTime - prevelapsedTime) + "</span>" + "\t" + formatTimer(elapsedTime);
    prevelapsedTime = elapsedTime;
    newNode.innerHTML = temp;
    lapButton.insertBefore(newNode, lapButton.children[0]);
    if (document.querySelectorAll('li').length === 1) document.querySelectorAll('li')[0].style.height = 'fit-content';
    else {
        setTimeout(function () {
            document.querySelectorAll('li')[0].style.height = window.getComputedStyle(document.querySelectorAll('li')[document.querySelectorAll('li').length - 1]).height;
        }, 10);
    }
}

function resetTimer() {
    reset = true;
    clearInterval(timerInterval);
    prevelapsedTime = 0;
    elapsedTime = 0;
    timer.textContent = "00:00:00";
    running = false;
    start_stop.textContent = "Start";
    lapButton.innerHTML = "";
    reset_lap.style.height = "0";
    reset_lap.style.width = "0";
    reset_lap.style.padding = "0";
    reset_lap.style.margin = "0";
}

function formatTimer(elapsedTime) {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const mseconds = Math.floor((elapsedTime % 1000) / 10);
    return (
        (hours ? (hours > 9 ? hours : "0" + hours) : "00")
        + ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00")
        + ":" +
        (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00")
        + "." +
        (mseconds > 9 ? mseconds : "0" + mseconds));
}
start_stop.addEventListener('click', start_stopTimer);
reset_lap.addEventListener('click', reset_lapTimer);


function updateClock() {
    seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    mseconds = Math.floor((elapsedTime % 1000) / 10);
    const secondHand = document.querySelector('.second-hand');
    const msecondHand = document.querySelector('.msecond-hand');
    const revsecondHand = document.querySelector('.revsecond-hand');
    const revmsecondHand = document.querySelector('.revmsecond-hand');
    const secondDegrees = seconds * 6;
    const msecondDegrees = mseconds * 3.6;
    const revsecondDegrees = secondDegrees - 180;
    const revmsecondDegrees = msecondDegrees - 180;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    msecondHand.style.transform = `rotate(${msecondDegrees}deg)`;
    revsecondHand.style.transform = `rotate(${revsecondDegrees}deg)`;
    revmsecondHand.style.transform = `rotate(${revmsecondDegrees}deg)`;
}
setInterval(updateClock, 1);
updateClock();

start_stop.addEventListener('mouseenter', () => {
    if (start_stop.textContent == "Start")
        start_stop.style.backgroundColor = '#005706';
    else
        start_stop.style.backgroundColor = '#181f27';
    start_stop.style.boxShadow = '2px 2px 20px rgba(0, 0, 0, 0.5)';
});
start_stop.addEventListener('mouseleave', () => {
    if (start_stop.textContent == "Start")
        start_stop.style.backgroundColor = '#008D09';
    else
        start_stop.style.backgroundColor = '#1c2834';
    start_stop.style.boxShadow = '5px 5px 10px rgba(0, 0, 0, 0.5)';
});
reset_lap.addEventListener('mouseenter', () => {
    if (reset_lap.textContent == "Reset")
        reset_lap.style.backgroundColor = '#941313';
    else
        reset_lap.style.backgroundColor = '#383a3c';
    reset_lap.style.boxShadow = '2px 2px 20px rgba(0, 0, 0, 0.5)';
});
reset_lap.addEventListener('mouseleave', () => {
    if (reset_lap.textContent == "Reset")
        reset_lap.style.backgroundColor = '#C61919';
    else
        reset_lap.style.backgroundColor = '#4d5053';
    reset_lap.style.boxShadow = '5px 5px 10px rgba(0, 0, 0, 0.5)';
});

window.addEventListener('resize', () => {
    if (reset === false) {
        if (window.innerWidth >= 700) {
            reset_lap.style.width = '10rem';
            reset_lap.style.height = '10rem';
        }
        else {
            reset_lap.style.width = '5rem';
            reset_lap.style.height = '5rem';
        }
    }

})

var lastclick=0;
document.querySelector('.clock').addEventListener("click", () => {
    lastclick=Date.now();
    if (!running && elapsedTime===0) start_stopTimer();
    else {
        reset_lapTimer();
    }

});

document.querySelector(".circlebar").addEventListener('click',()=>{
    document.querySelector('.small').style.height = '0';
    start_stop.style.backgroundColor = '#008D09';
    resetTimer();
});