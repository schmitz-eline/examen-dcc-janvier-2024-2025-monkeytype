import {paragraphs} from "./paragraphs";

export class GameState {
    constructor() {
        this.currentParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
        this.currentWord = 0;
        this.currentLetter = 0;
        this.correctLetters = 0;
        this.errorLetters = 0;
    }
}