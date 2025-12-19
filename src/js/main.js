import {settings} from "./settings";
import {GameState} from "./GameState";

const monkeyType = {
    init() {
        this.paragraphElement = document.querySelector(settings.paragraphElementSelector);
        this.timerElement = document.getElementById(settings.timerId);

        this.gameState = new GameState();

        this.intervalId = null;
        this.remainingTime = settings.maxTime;

        this.generateParagraph();
        this.displayCursor();
        this.eventListeners();
        this.displayTime();
    },

    generateParagraph() {
        this.generateWordElements();
    },

    generateWordElements() {
        for (const word of this.gameState.currentParagraph) {
            this.generateWordElement(word);
        }
    },

    generateWordElement(word) {
        const spanWordElement = document.createElement('span');
        spanWordElement.className = settings.wordClass;
        word.spanWordElement = spanWordElement;
        for (const letter of word.letters) {
            this.generateLetterElement(letter, spanWordElement);
        }
        this.paragraphElement.insertAdjacentElement('beforeend', spanWordElement);
    },

    generateLetterElement(letter, spanWordElement) {
        const spanLetterElement = document.createElement('span');
        spanLetterElement.textContent = letter.letter;
        spanWordElement.insertAdjacentElement('beforeend', spanLetterElement);
        letter.spanLetterElement = spanLetterElement;
    },

    displayCursor() {
        this.gameState.currentParagraph[this.gameState.currentWord].spanWordElement.classList.add(settings.currentWordClass);
        this.gameState.currentParagraph[this.gameState.currentWord].letters[this.gameState.currentLetter].spanLetterElement.classList.add(settings.currentClass);
    },

    eventListeners() {
        window.addEventListener('keydown', (event) => {
            this.type(event);
        });
    },

    type(event) {
        if (!settings.isIgnorableKey(event)) {
            if (this.intervalId === null) {
                this.intervalId = setInterval(this.updateTime.bind(this), 1000);
            }
            this.gameState.currentParagraph[this.gameState.currentWord].letters[this.gameState.currentLetter].spanLetterElement.classList.remove(settings.currentClass);

            this.gameState.currentLetter++;
            if (this.gameState.currentLetter === this.gameState.currentParagraph[this.gameState.currentWord].letters.length) {
                this.gameState.currentParagraph[this.gameState.currentWord].spanWordElement.classList.add(settings.typedClass);
                this.gameState.currentWord++;
                this.currentLetter = 0;
                this.displayCursor();
            } else {
                this.gameState.currentParagraph[this.gameState.currentWord].letters[this.gameState.currentLetter].spanLetterElement.classList.add(settings.currentClass);
            }
        }
    },

    updateTime() {
        this.remainingTime--;
        if (this.remainingTime === 0) {
            clearInterval(this.intervalId);
            //TODO: end game
        }
        this.displayTime();
    },

    displayTime() {
        this.timerElement.textContent = `${this.remainingTime}`;
    },
}

monkeyType.init();