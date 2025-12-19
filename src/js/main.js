const monkeyType = {

    // Pour retirer un écouteur d'événement :
    init() {
        this.eventListener = this.play.bind(this);
        window.addEventListener('keydown', this.eventListener);
        window.removeEventListener('keydown', this.eventListener); /* Quand la personne perd le jeu */
    },

    play() {
        console.log('play');
    }
    //
}

monkeyType.init();