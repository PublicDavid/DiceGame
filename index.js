// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Won = 0
let player2Won = 0
let endBestOf = false
let player1Turn = true

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const doubleBtn = document.getElementById("doubleBtn")
const doubleMessage = document.getElementById("doubleMessage")
const player1BestOf = document.querySelector('.player1BestOf').childNodes
const player2BestOf = document.querySelector('.player2BestOf').childNodes

function showResetButton() {
    rollBtn.style.display = "none"
    doubleBtn.style.display = "none"
    resetBtn.style.display = "block"
    doubleMessage.style.display = "none"
}

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    doubleMessage.style.display = "none"
    
    const randomNumber = getRandomNumber();

    updateScore(randomNumber);

    checkScore();
    
    player1Turn = !player1Turn
})

doubleBtn.addEventListener('click', function() {
    let randomNumber = getRandomNumber();
    if (randomNumber % 2 === 1) {
        doubleMessage.textContent = `You rolled ${randomNumber}, we flushed it! 😭`
        randomNumber = 0;
    } else {
        doubleMessage.textContent = `You rolled ${randomNumber}, we doubled it! 💰`
        randomNumber *= 2;
    }
    
    updateScore(randomNumber);
    doubleMessage.style.display = "block"

    checkScore();
    
    player1Turn = !player1Turn

})
 
resetBtn.addEventListener("click", function(){
    reset()
})

function getRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

function updateScore(randomNumber) {
    if (player1Turn) {
        player1Score += randomNumber
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randomNumber
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
    } else {
        player2Score += randomNumber
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = randomNumber
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"
    }
}

function checkScore() {
    if (player1Score >= 20) {
        player1Won++;
        message.textContent = "Player 1 Won This Battle 🥳"
        colorButton('player1');
        if (player1Won === 2) {
            endBestOf = true
            message.textContent = "Player 1 Won The Best Of 🦾"
        }
        showResetButton()
    }  else if (player2Score >= 20) {
        player2Won++;
        colorButton('player2');
        message.textContent = "Player 2 Won This Battle🎉"
        if (player2Won === 2) {
            endBestOf = true
            message.textContent = "Player 2 Won The Best Of 🦾"
        }
        showResetButton()
    }
}

function colorButton(player) {
    if (player === 'player1') {
        for (let item of player1BestOf) {
            if (item.className !== 'gamewon') {
                item.classList.add('gamewon')
                return;
            }
        }
    } else {
        for (let item of player2BestOf) {
            if (item.className !== 'gamewon') {
                item.classList.add('gamewon')
                return;
            }
        }
    }
}

function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"
    message.textContent = "Player 1 Turn"
    resetBtn.style.display = "none"
    doubleMessage.style.display = "none"
    rollBtn.style.display = "block"
    doubleBtn.style.display = "block"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
    if (endBestOf) {
        for (let item of player1BestOf) {
            if (item.className === 'gamewon') {
                item.classList.remove('gamewon')
            }
        }
        for (let item of player2BestOf) {
            if (item.className === 'gamewon') {
                item.classList.remove('gamewon')
            }
        }
        player1Won = 0
        player2Won = 0
        endBestOf = false        
    }
}
