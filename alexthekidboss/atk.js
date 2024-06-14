//remove splash, enable keypress and start countdown
function start(){
    document.getElementById('welcomeSplash').style.display = 'none';
    document.addEventListener('keydown', userSelection);

    //countdown
    const countdownbox = document.getElementById('countDown');
    let theNumber = 3;
    setTimeout(() =>{
        countdownbox.innerHTML = theNumber;
        const interval = setInterval(() => {
            theNumber -= 1;
            if (theNumber > 0) {
                countdownbox.innerHTML = theNumber;
            } else {
                countdownbox.style.display = 'none';
                setTimeout (() =>{
                    result();
                },1000)
                
                clearInterval(interval);
            }
    
        },1010)
    },2000)
}

//allow user to make their selection
let playerFinalSelection = 'R';
function userSelection(event) {
    const userSelection = document.getElementById('playerChoice');
    switch(event.key.toUpperCase()){
        case 'R':
            playerChoice.style.backgroundPosition = '0px 0px';
            playerFinalSelection = 'R';
            break;
        case 'S':
            playerChoice.style.backgroundPosition = '-101px 0px';
            playerFinalSelection = 'S';
            break;
        case 'P':
            playerChoice.style.backgroundPosition = '-202px 0px';
            playerFinalSelection = 'P';
            break;
    }
}

//stop the annimations and show the result

function result(){
    //lock user selection
    document.removeEventListener('keydown', userSelection);

    //stop annimations
    document.getElementById('cpuChoice').classList.remove('cpuChoiceAnim');
    document.getElementById('cpu').classList.remove('cpuIdleAnim');
    document.getElementById('human').classList.remove('playerIdleAnim');

    // decide and show the CPU's choice
    let cpuFinalSelection = Math.floor(Math.random() * 3) + 1;
    switch(cpuFinalSelection){
        case 1:
            cpuFinalSelection = 'R';
            document.getElementById('cpuChoice').style.backgroundPosition = '0 0';
            break;
        case 2:
            cpuFinalSelection = 'S';
            document.getElementById('cpuChoice').style.backgroundPosition = '-101px 0';
            break;
        case 3:
            cpuFinalSelection = 'P';
            document.getElementById('cpuChoice').style.backgroundPosition = '-203px 0';
            break;
    }

    // determine the winner
    let finalDisplay = 'WIN!!!'
    if (playerFinalSelection === cpuFinalSelection) {
        finalDisplay = 'drew'
    } else if (playerFinalSelection === 'R' && cpuFinalSelection === 'P') {
        finalDisplay = 'lose'
    } else if (playerFinalSelection === 'S' && cpuFinalSelection === 'R') {
        finalDisplay = 'lose'
    } else if (playerFinalSelection === 'P' && cpuFinalSelection === 'S') {
        finalDisplay = 'lose'
    }
    const collection = document.getElementsByClassName('choice');
    for (let i = 0; i < collection.length; i++) {
        collection[i].classList.add('wobble');
    }
    setTimeout(() => {
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').innerHTML = '<p>You ' + finalDisplay + '</p><button onclick="reset()">Try again?</button>'; 
    }, 1300);
}

function reset() {
    //reset variables
    playerFinalSelection = 'R'

    //reset classes
    document.getElementById('cpuChoice').classList.add('cpuChoiceAnim');
    document.getElementById('cpu').classList.add('cpuIdleAnim');
    document.getElementById('human').classList.add('playerIdleAnim');
    const collection = document.getElementsByClassName('choice');
    document.getElementById('result').style.display = 'none';
    for (let i = 0; i < collection.length; i++) {
        collection[i].classList.remove('wobble');
    }
    //readd event listener
    document.addEventListener('keydown', userSelection);

    //start the game
    start();
}