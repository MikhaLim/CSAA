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
    let i = 0;
    while (i < 5) {
        let row = document.createElement("div");
        row.classList.add("row");
        let j = 0;
        while (j < 5) {
            let box = document.createElement("div");
            box.classList.add("box");
            row.appendChild(box);
            j++;
        }
        grid.appendChild(row);
        i++;
    }
}

function submitGuess() {
    if (currentAttempt >= 5) return;

    let guessedWord = prompt("Enter a 5-letter word:").toLowerCase();
    
    if (!guessedWord || guessedWord.length !== 5 || !/^[a-z]+$/.test(guessedWord)) {
        alert("Enter a valid 5-letter word!");
        return;
    }
    
    let gridRows = document.getElementById("word-grid").children;
    let currentRow = gridRows[currentAttempt];

    let i = 0;
    while (i < 5) {
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
        i++;
    }
    
    currentAttempt++;
    attemptsLeft--;
    document.getElementById("attempts").innerText = attemptsLeft;

    if (guessedWord === selectedWord) {
        alert("You win! 🎉");
        return;
    } else if (attemptsLeft === 0) {
        alert(`Game Over! The word was: ${selectedWord}`);
    }
}

function restartGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    attemptsLeft = 5;
    currentAttempt = 0;
    document.getElementById("attempts").innerText = attemptsLeft;
    createGrid();
}

createGrid();
