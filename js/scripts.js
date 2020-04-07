// DOM references
const keyboard = document.getElementById('qwerty');
const phraseSection = document.getElementById('phrase');
const startButton = document.querySelector('button.btn__reset');
const overlay = document.getElementById('overlay');


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
    // Turn the randomly selected phrase into an array of letters
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
// PROBLEM: Right now, if a letter appears in the hidden phrase more than once, checkLetter() only reveals the first instance of that letter... why?

const checkLetter = (chosenLetter) => {
    for (let i = 0; i < daPhrase.length; i++) {
        let phraseLetterLI = phraseLIs[i];
        phraseLetter = phraseLetterLI.textContent.toLowerCase();
        if (chosenLetter === phraseLetter) {
            letterFound = phraseLetter;
            phraseLetterLI.classList.add('show');
        }
    }
};

// Keyboard event listener
keyboard.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
        let button = e.target;
        let buttonText = button.textContent;
        button.classList.add('chosen');
        button.disabled = true;
        checkLetter(buttonText);
        }
    });