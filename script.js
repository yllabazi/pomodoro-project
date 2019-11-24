let sessionTime = 25;
let breakTime = 5;
let countDown;
let secondsLeft;
secondsToStart = sessionTime * 60;

function timer(seconds){
    const now = Date.now();
    const then = now + (seconds+1) * 1000;
    
    countDown = setInterval(function(){
        secondsLeft = Math.round((then - Date.now())/1000);
        let min = Math.floor(secondsLeft/60);
        let sec = secondsLeft % 60;
        
        console.log(secondsLeft);
        
        if(secondsLeft < 0) {
            clearInterval(countDown);
            if(displayTimerType.textContent === "Session"){
                let seconds = breakTime * 60;
                timer(seconds);
                displayTimerType.textContent = "Break";
            }else if(displayTimerType.textContent === "Break"){
                let seconds = sessionTime * 60;
                timer(seconds);
                displayTimerType.textContent = "Session";
            }
            return;
        }
        
        displayTimer.textContent = ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
        return secondsLeft;
        
    }, 1000);
}

function displayCounter(seconds){
    const now = Date.now();
    const then = now + seconds * 1000;
    
    const secondsLeft = Math.round((then - Date.now())/1000);
    let min = Math.floor(secondsLeft/60);
    let sec = secondsLeft % 60;
    
    return ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2)
}

function toggleButtons(value){
    upSessionBtn.disabled = value;
    downSessionBtn.disabled = value;
    upBreakBtn.disabled = value;
    downBreakBtn.disabled = value;
    startBtn.disabled = value;
}

const upSessionBtn = document.querySelector(".upSession");
const downSessionBtn = document.querySelector(".downSession");

const upBreakBtn = document.querySelector(".upBreak");
const downBreakBtn = document.querySelector(".downBreak");

const displaySessionTime = document.querySelector(".sessionTime");
displaySessionTime.textContent = sessionTime;

const displayBreakTime = document.querySelector(".breakTime");
displayBreakTime.textContent = breakTime;

const displayTimer = document.querySelector(".displayTimer");
displayTimer.textContent = displayCounter(sessionTime * 60);

const displayTimerType = document.querySelector(".displayType");
displayTimerType.textContent = "Session";

const startBtn = document.querySelector(".startCountDown");
const pauseBtn = document.querySelector(".pauseCountDown");
const stopBtn = document.querySelector(".stopCountDown");
const resetBtn = document.querySelector(".resetCountDown");

upSessionBtn.addEventListener('click', function() {
    sessionTime++;
    secondsToStart = sessionTime * 60;
    displaySessionTime.textContent = sessionTime;
    displayTimer.textContent = displayCounter(sessionTime * 60);
});

downSessionBtn.addEventListener('click', function() {
    sessionTime--;
    secondsToStart = sessionTime * 60;
    displaySessionTime.textContent = sessionTime;
    displayTimer.textContent = displayCounter(sessionTime * 60);
});

upBreakBtn.addEventListener('click', function() {
    breakTime++; 
    displayBreakTime.textContent = breakTime;
    displayTimer.textContent = displayCounter(sessionTime * 60);
});

downBreakBtn.addEventListener('click', function() {
    breakTime--;
    displayBreakTime.textContent = breakTime;
    displayTimer.textContent = displayCounter(sessionTime * 60);
});

startBtn.addEventListener('click', function(){ 
    timer(4);
    toggleButtons(true);
})

pauseBtn.addEventListener('click', function() {
    clearInterval(countDown);
    secondsToStart = secondsLeft;
    startBtn.disabled = false;
})

stopBtn.addEventListener('click', function() {
    clearInterval(countDown);
    secondsToStart = sessionTime * 60;
    toggleButtons(false);
})

resetBtn.addEventListener('click', function() {
    clearInterval(countDown);
    secondsToStart = sessionTime * 60;
    toggleButtons(false);
    displayTimer.textContent = displayCounter(sessionTime * 60);
})