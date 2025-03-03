const words = [
    "apple", "grape", "pearl", "table", "chair", "money", "smile", "cloud", "light", "brave",
    "earth", "crown", "flame", "ocean", "sugar", "plant", "stone", "dream", "happy", "music",
    "peace", "train", "shiny", "bread", "tiger", "fruit", "block", "fancy", "spoon", "dance",
    "lemon", "magic", "quiet", "sharp", "blend", "frost", "power", "trick", "waste", "chill",
    "trust", "scene", "lucky", "voice", "match", "river", "smoke", "glove", "clean", "taste"
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let attemptsLeft = 5;

document.getElementById("attempts").innerText = attemptsLeft;

function createGrid() {
    let grid = document.getElementById("word-grid");
    grid.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        let row = document.createElement("div");
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div");
            box.classList.add("box");
            row.appendChild(box);
        }
        grid.appendChild(row);
    }
}

function submitGuess() {
    let inputElement = document.getElementById("letter-input");
    let guessedWord = inputElement.value.toLowerCase();
    inputElement.value = "";

    if (guessedWord.length !== 5 || !/^[a-z]+$/.test(guessedWord)) {
        document.getElementById("message").innerText = "Enter a valid 5-letter word!";
        return;
    }

    let gridRows = document.getElementById("word-grid").children;
    let currentRow = gridRows[5 - attemptsLeft];

    for (let i = 0; i < 5; i++) {
        let box = currentRow.children[i];
        box.innerText = guessedWord[i];

        if (guessedWord[i] === selectedWord[i]) {
            box.classList.add("correct");
        } else if (selectedWord.includes(guessedWord[i])) {
            box.classList.add("partial");
        } else {
            box.classList.add("wrong");
        }
    }

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
    document.getElementById("message").innerText = "";
    document.getElementById("attempts").innerText = attemptsLeft;
    document.getElementById("letter-input").disabled = false;
    createGrid();
}

createGrid();
