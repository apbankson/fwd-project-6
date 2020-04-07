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

    // Add the randomly selected phrase to the DOM
const addPhraseToDisplay = (arr) => {
    
};
