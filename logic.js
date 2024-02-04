function getRandomNumber(){
    var number = Math.floor(Math.random() * 100) + 1;
    return number;
}

var numberOfGuesses = 7;

var tries = 0;

var message = document.querySelector(".message");

message.innerText = "You have " + numberOfGuesses + " tries to guess right number!";

var button = document.querySelector("button");

var randomNumber = getRandomNumber();

var gameOver = false;

button.addEventListener("click", function(){
    var userGuess = document.querySelector("input");
    userGuess = parseInt(userGuess.value);
    if(String(userGuess) === "NaN"){
        return;
    }
    if(userGuess >= 101 || userGuess <= 0){
        return;
    }
    else{
        var result = document.querySelector(".result");
        if(tries < numberOfGuesses && (!gameOver)){
            ++tries;
            if(playGame(randomNumber, userGuess, result)){
                playAgain();
            }
            else{
                if(tries == numberOfGuesses){
                    result.innerText = "You lost, Correct number was " + randomNumber + "!";
                playAgain();
                }
            }
        }
        else{
            result.innerText = "Game Over!";
            playAgain();
        }
    }
})

var userInputs = [];

function playGame(random, userGuess, result){
    //console.log(random + "   " + userGuess);
    if(userGuess > random){
        result.innerText = "Number is smaller!";
    }
    else if(userGuess < randomNumber){
        result.innerText = "Number is larger!";
    }
    else{
        result.innerText = "You Won!";
        return true;
    }
    userInputs.push(userGuess);
    var inputsList = "";
    for(var i = 0; i < userInputs.length; i++){
        inputsList = inputsList + "<li>" + userInputs[i] + "</li>";
    }
    var previouInputs = document.querySelector(".previous-inputs");
    previouInputs.innerHTML = inputsList;
    return false;
}

function playAgain(){
    gameOver = true;
    var again = document.querySelector(".play-again");
    again.style.display = "flex";
    document.querySelector(".yes").addEventListener("click", function (){
        again.style.display = "none";
        reset();
    });
}

function reset(){
    tries = 0;
    randomNumber = getRandomNumber();
    document.querySelector(".result").innerText = "Enter a number between 1 to 100!";
    gameOver = false;
    document.querySelector(".previous-inputs").innerHTML = "";
    var length = userInputs.length;
    for(var i = 0; i < length; i++){
        userInputs.pop();
    }
}
