const words = [
    "cream", "grape", "pearl", "table", "chair", "money", "smile", "cloud", "light", "brave",
    "earth", "crown", "flame", "ocean", "sugar", "plant", "stone", "dream", "cabin", "music",
    "hacks", "train", "shiny", "bread", "tiger", "fruit", "block", "fancy", "image", "dance",
    "lemon", "magic", "quiet", "sharp", "blend", "frost", "power", "trick", "waste", "admin",
    "labor", "yacht", "lucky", "voice", "match", "actor", "smoke", "glove", "clean", "habit"
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let attemptsLeft = 5;
let currentAttempt = 0;

document.getElementById("attempts").innerText = attemptsLeft;

function createGrid() {
    let grid = document.getElementById("word-grid");
    grid.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div");
            box.classList.add("box");
            row.appendChild(box);
        }
        grid.appendChild(row);
    }
}

document.getElementById("letter-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        submitGuess();
    }
});

function submitGuess() {
    let inputElement = document.getElementById("letter-input");
    let guessedWord = inputElement.value.toLowerCase();
    inputElement.value = "";
    
    if (guessedWord.length !== 5 || !/^[a-z]+$/.test(guessedWord)) {
        document.getElementById("message").innerText = "Enter a valid 5-letter word!";
        return;
    }
    
    let gridRows = document.getElementById("word-grid").children;
    let currentRow = gridRows[currentAttempt];
    
    for (let i = 0; i < 5; i++) {
        let box = currentRow.children[i];
        box.innerText = guessedWord[i];
        box.classList.remove("correct", "partial", "wrong");
        
        if (guessedWord[i] === selectedWord[i]) {
            box.classList.add("correct");
        } else if (selectedWord.includes(guessedWord[i])) {
            box.classList.add("partial");
        } else {
            box.classList.add("wrong");
        }
    }
    
    currentAttempt++;
    attemptsLeft--;
    document.getElementById("attempts").innerText = attemptsLeft;

    if (guessedWord === selectedWord) {
        document.getElementById("message").innerText = "You win! 🎉";
        document.getElementById("letter-input").disabled = true;
    } else if (attemptsLeft === 0) {
        document.getElementById("message").innerText = `Game Over! The word was: ${selectedWord}`;
        document.getElementById("letter-input").disabled = true;
    }
}

function restartGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    attemptsLeft = 5;
    currentAttempt = 0;
    document.getElementById("message").innerText = "";
    document.getElementById("attempts").innerText = attemptsLeft;
    document.getElementById("letter-input").disabled = false;
    createGrid();
}

createGrid();
