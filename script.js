const words = [
    "grasp", "track", "vowel", "sharp", "frost",
    "brave", "piano", "spine", "charm", "flame",
    "stork", "dwarf", "creep", "blink", "shrub",
    "whale", "clamp", "draft", "drain", "torch",
    "scarf", "stomp", "globe", "quilt", "plush",
    "graze", "pride", "trend", "latch", "swoop",
    "crisp", "flint", "wrist", "chore", "grime",
    "wrack", "chasm", "sling", "swamp", "stint",
    "dwell", "tryst", "grind", "shred", "swirl",
    "brisk", "thump", "shale", "frisk", "broil"
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let displayedWord = "_".repeat(selectedWord.length).split("");
let health = 5;
let score = 0;
let guessedLetters = [];

document.getElementById("word-display").innerText = displayedWord.join(" ");
document.getElementById("lives").innerText = health;

document.getElementById("guess-btn").addEventListener("click", guessLetter);
document.getElementById("restart-btn").addEventListener("click", restartGame);

function guessLetter() {
    let inputElement = document.getElementById("letter-input");
    let guessedLetter = inputElement.value.toLowerCase();
    let messageElement = document.getElementById("message");
    inputElement.value = ""; 

    if (guessedLetter.length !== 1 || !guessedLetter.match(/[a-z]/)) {
        messageElement.innerText = "Please enter a valid letter!";
        return;
    }

    if (score === selectedWord.length || health <= 0) {
        messageElement.innerText = "Game over! Refresh to play again.";
        return;
    }

    if (guessedLetters.includes(guessedLetter)) {
        messageElement.innerText = "You already guessed that letter!";
        return;
    }

    guessedLetters.push(guessedLetter);

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
        messageElement.innerText = "You win! 🎉";
        disableGame();
    } else if (health === 0) {
        messageElement.innerText = Game over! The word was: "${selectedWord}".;
        disableGame();
    }
}

function disableGame() {
    document.getElementById("letter-input").disabled = true;
    document.getElementById("guess-btn").disabled = true;
    document.getElementById("restart-btn").style.display = "block";
}

function restartGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = "_".repeat(selectedWord.length).split("");
    health = 5;
    score = 0;
    guessedLetters = [];

    document.getElementById("word-display").innerText = displayedWord.join(" ");
    document.getElementById("lives").innerText = health;
    document.getElementById("message").innerText = "";
    document.getElementById("letter-input").disabled = false;
    document.getElementById("guess-btn").disabled = false;
    document.getElementById("restart-btn").style.display = "none";
}
