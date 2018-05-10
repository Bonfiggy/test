var maxGuesses = 10;            
var lettersGuessed = [];        
var arrayWords;           
var guessingWord = [];          
var guessesLeft = 0;       
var gameStarted = false;        
var gameFinished = false;             
var wins = 0;                   
var losses = 0;                 

var wordList =           
    [
        "banana",
        "coding",
        "elephant",
        "software",
        "javascript",
        "computer",
        "hardware",
        "apple",
        "television",
        "wireless",
        "cellular",
        "global",
        "monitor",
        "ethernet",
        "python",
        "speaker",
        "keyboard",
        "mouse",
        "laptop",
        "encyclopedia",
        "remote",
        "connection",
        "server",
    ];

function resetGame() {
    guessesLeft = maxGuesses;
    gameStarted = false;

    arrayWords = Math.floor(Math.random() * (wordList.length));

    lettersGuessed = [];
    guessingWord = [];

    for (var i = 0; i < wordList[arrayWords].length; i++) {
        guessingWord.push("_");
    }

    document.getElementById("tryAgain").style.cssText= "display: none";
    document.getElementById("overImg").style.cssText = "display: none";
    document.getElementById("winImg").style.cssText = "display: none";

    updateDisplay();
};

function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("totalLosses").innerText = losses;
    document.getElementById("word").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("word").innerText += guessingWord[i];
    }
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("lettersGuessed").innerText = lettersGuessed;
    if(guessesLeft <= 0) {
        document.getElementById("overImg").style.cssText = "display: block";
        document.getElementById("tryAgain").style.cssText = "display:block";
        gameFinished = true;
    }
};
document.onkeydown = function(event) {
    if(gameFinished) {
        resetGame();
        gameFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};
function makeGuess(letter) {
    if (guessesLeft > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        if (lettersGuessed.indexOf(letter) === -1) {
            lettersGuessed.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};
function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < wordList[arrayWords].length; i++) {
        if(wordList[arrayWords][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        guessesLeft--;
    } 
    else {
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("winImg").style.cssText = "display: block";
        document.getElementById("tryAgain").style.cssText= "display: block";
        wins++;
        gameFinished = true;
    }
};
// Couldn't get the losses to count(still working on it)
function checkLoss(){
    if(guessingWord.indexOf("_") !== -1) {
        document.getElementById("overImg").style.cssText = "display: block";
        document.getElementById("tryAgain").style.cssText= "display: block";
        losses++;
        gameFinished = true;
    }
}

