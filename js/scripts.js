// DOM references
const keyboard = document.getElementById('qwerty');
const keyboardKeys = document.querySelectorAll('div.keyrow button')
const phraseSection = document.getElementById('phrase');
const theButton = document.querySelector('button.btn__reset');
const overlay = document.getElementById('overlay');
const overlayOpacity = overlay.style.opacity;
const tries = document.querySelector('#scoreboard ol');
const title = document.querySelector('.title');


// Event listeners
    // Start button event listener
    // This transition is ugly a.f. -- should come back in and make this smoother with some CSS once the bones are in this.

theButton.addEventListener('click', () => {
    overlay.style.opacity = '0';
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 500);
});

// State variables
let missed = 0;

// PHRASE STUFF
    // Phrase array
let thePhrases = [
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

    // Function to add the randomly selected phrase to the DOM. 
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

    // Function to combine getRandomPhrase and addPhraseToDisplay -- picks a random phrase from the array of phrases passed in and then appends to the DOM
const selectAndAppendPhrase = (phrases) => {
    let daPhrase = getRandomPhrase(phrases).split('');
    addPhraseToDisplay(daPhrase);
}

selectAndAppendPhrase(thePhrases);

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
        setTimeout(function() {
            overlay.style.opacity = 1;
        }, 200);
        overlay.className = 'win';
        title.textContent = 'YOU WIN!'
        theButton.textContent = 'Restart game';
    }
}

const checkLose = () => {
    if (missed >= 5) {
        overlay.style.display = '';
        setTimeout(function() {
            overlay.style.opacity = 1;
        }, 200);
        overlay.className = 'lose';
        title.textContent = 'YOU LOSE!';
        theButton.textContent = 'Restart game';
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

theButton.addEventListener('click', () => {
    if (theButton.textContent == 'Restart game') {
        console.log('well at least this is firing');
        for (let i = 0; i < keyboardKeys.length; i++) {
            keyboardKeys[i].className = '';
        } 
        missed = 0; 

        // Insert code here to remove the lis that contain the old phrase -- also, need to fix the way that the lis are getting appended
        // to the DOM because they are not being added as children of the ul but just of the div. 
        // Also need to add the lives back

        selectAndAppendPhrase(thePhrases);
    }
});