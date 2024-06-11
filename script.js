const wordDisplay = document.getElementById('wordDisplay');
const message = document.getElementById('message');
const wrongLetters = document.getElementById('wrongLetters');
const parts = document.querySelectorAll('.part');
const resetButton = document.getElementById('reset');

const words = ['javascript', 'hangman', 'developer', 'coding', 'programming'];
let selectedWord = '';
let displayedWord = '';
let incorrectGuesses = [];
let correctGuesses = [];

function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = '_'.repeat(selectedWord.length);
    incorrectGuesses = [];
    correctGuesses = [];
    message.textContent = '';
    updateDisplay();
    resetParts();
}

function updateDisplay() {
    wordDisplay.textContent = displayedWord.split('').join(' ');
    wrongLetters.textContent = `Wrong Letters: ${incorrectGuesses.join(', ')}`;
}

function resetParts() {
    parts.forEach(part => part.style.display = 'none');
}

function handleGuess(letter) {
    if (correctGuesses.includes(letter) || incorrectGuesses.includes(letter)) {
        return;
    }
    if (selectedWord.includes(letter)) {
        correctGuesses.push(letter);
        updateDisplayedWord();
    } else {
        incorrectGuesses.push(letter);
        showPart(incorrectGuesses.length);
    }
    updateDisplay();
    checkGameStatus();
}

function updateDisplayedWord() {
    let newDisplayedWord = '';
    for (let i = 0; i < selectedWord.length; i++) {
        if (correctGuesses.includes(selectedWord[i])) {
            newDisplayedWord += selectedWord[i];
        } else {
            newDisplayedWord += '_';
        }
    }
    displayedWord = newDisplayedWord;
}

function showPart(index) {
    if (index <= parts.length) {
        parts[index - 1].style.display = 'block';
    }
}

function checkGameStatus() {
    if (displayedWord === selectedWord) {
        message.textContent = 'Congratulations! You won!';
        disableKeyboard();
    } else if (incorrectGuesses.length === parts.length) {
        message.textContent = `Game over! The word was "${selectedWord}".`;
        disableKeyboard();
    }
}

function disableKeyboard() {
    document.removeEventListener('keydown', handleKeydown);
}

function handleKeydown(event) {
    const letter = event.key.toLowerCase();
    if (/^[a-z]$/.test(letter)) {
        handleGuess(letter);
    }
}

resetButton.addEventListener('click', () => {
    initializeGame();
    document.addEventListener('keydown', handleKeydown);
});

initializeGame();
document.addEventListener('keydown', handleKeydown);
