const words = ["javascript", "developer", "hangman", "program", "coding"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let displayedWord = "_".repeat(selectedWord.length).split("");
let health = 5;
let score = 0;


document.getElementById("word-display").innerText = displayedWord.join(" ");


function guessLetter() {
    let inputElement = document.getElementById("letter-input");
    let guessedLetter = inputElement.value.toLowerCase();
    inputElement.value = ""; // Clear input


    if (guessedLetter.length !== 1 || !guessedLetter.match(/[a-z]/)) {
        document.getElementById("message").innerText = "Please enter a valid letter!";
        return;
    }

  
    if (score === selectedWord.length || health <= 0) {
        document.getElementById("message").innerText = "Game over! Refresh to play again.";
        return;
    }

 
    let found = false;
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter && displayedWord[i] === "_") {
            displayedWord[i] = guessedLetter;
            score++;
            found = true;
        }
    }

   
    document.getElementById("word-display").innerText = displayedWord.join(" ");


    if (!found) {
        health--;
        document.getElementById("lives").innerText = health;
    }

   
    if (score === selectedWord.length) {
        document.getElementById("message").innerText = "You win! 🎉";
    } else if (health === 0) {
        document.getElementById("message").innerText = "Game over! The word was: " + selectedWord;
    }
}
