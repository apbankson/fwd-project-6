// DOM references
const keyboard = document.getElementById('qwerty');
const phraseSection = document.getElementById('phrase');
const startButton = document.querySelector('button.btn__reset');
const overlay = document.getElementById('overlay');
const tries = document.querySelector('#scoreboard ol');
const title = document.querySelector('.title');


// Event listeners
    // Start button event listener
    // This transition is ugly a.f. -- should come back in and make this smoother with some CSS once the bones are in this.
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// State variables
let missed = 0;
let keepGoing = true;

// PHRASE STUFF
    // Phrase array
let phrases = [
    "TRACK THE PAST",
    "ORDER THE PRESENT",
    "DESIGN THE FUTURE",
    "TASK AT HAND",
    "EVERYTHING BELONGS"
];

    // Function to get a random phrase out of the phrases array
const getRandomPhrase = arr => {
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };
    let phraseArrLength = arr.length;
    let phraseSelector = getRandomInt(phraseArrLength);
    return arr[phraseSelector];
};
    // Call the function and set the randomly chosen phrase to the variable "daPhrase"
let daPhrase = getRandomPhrase(phrases);
    // Turn the randomly selected phrase into an array of letters including spaces
daPhrase = daPhrase.split('');



    // Add the randomly selected phrase to the DOM -- the space thing here is still not ideal. Review at the end. 
const addPhraseToDisplay = (_arr) => {
    const appendToUL = (letter) => {
        phraseSection.appendChild(letter);
    };
    for (let i = 0; i < _arr.length; i++) {
        let currentLetter = _arr[i];
        let currentLetterLI = document.createElement('li');
        currentLetterLI.textContent = currentLetter;
        if (currentLetter != ' ') {
            currentLetterLI.className = 'letter';
        } else {
            currentLetterLI.innerHTML = '&nbsp;';
            currentLetterLI.className = 'space';
        }
        appendToUL(currentLetterLI);
    }
};

addPhraseToDisplay(daPhrase);
let phraseLIs = phraseSection.querySelectorAll('li.letter');

// Function to check selected letter against the randomly selected hidden phrase

const checkLetter = (chosenLetter) => {
    let match = null;
    for (let i = 0; i < phraseLIs.length; i++) {
        let phraseLetterLI = phraseLIs[i];
        let phraseLetter = phraseLetterLI.textContent.toLowerCase();
        if (chosenLetter === phraseLetter) {
            letterFound = phraseLetter;
            phraseLetterLI.classList.add('show');
            match = chosenLetter;
        }
    }
    return match;
};

let numberOfShowingLetters = document.querySelectorAll('.show').length;

const checkWin = () => {
    let numberOfShowingLetters = document.querySelectorAll('.show').length;
    if (phraseLIs.length == numberOfShowingLetters) {
        overlay.style.display = '';
        overlay.className = 'win';
        title.textContent = 'YOU WIN!'
        startButton.textContent = 'Restart game';
    }
}

const checkLose = () => {
    if (missed >= 5) {
        overlay.style.display = '';
        overlay.className = 'lose';
        title.textContent = 'YOU LOSE!';
        startButton.textContent = 'Restart game';
    }
}

// Keyboard event listener
keyboard.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
        let button = e.target;
        let buttonText = button.textContent;
        button.classList.add('chosen');
        button.disabled = true;
        let didItMatch = checkLetter(buttonText);
        if (didItMatch == null) {
            missed += 1; 
            tries.removeChild(tries.children[0]);
        }
        // Win and Loss conditions -- checking fires on each click event
        checkWin();
        checkLose();
        }
    });