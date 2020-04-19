class Checker {
    constructor(index, owner) {
        this.owner = owner;
        this.id = `checker-${owner.id}-${index}`;
        this.isInPlay = true;
        this.isKing = false;
        this.active = false;
        this.space = null;
    }

    /**
     * Draws HTML checker
     * @param   {Object}    space - targeted Space object to draw checker on
     * @param   {string}    color - checker color
     */
	drawHTMLChecker(space, color) {    
        const HTMLChecker = document.createElement('div');
        HTMLChecker.setAttribute('id', this.id);
        HTMLChecker.classList.add('checker');
        HTMLChecker.style.backgroundColor = color;

        document.querySelector(`#${space.id}`).appendChild(HTMLChecker);
        this.mark(space);
        space.mark(this);
    }

    /**
     * Updates checker to reflect space it's been placed on
     * @param   {Object}    space - space where checked has been placed
     */
	mark(space) {
		this.space = space;
    }
    
    /**
     * Jumps opponent's checker
     * @param   {Object}    targetSpace - space checker will move to
     * @param   {Object}    opponentChecker - opponent's checker that active player is jumping
     * @param   {Object}    reset - function to call after checker has been jumped
     */
    jumpChecker(targetSpace, opponentChecker, reset) {
        opponentChecker.removeChecker();
        this.moveChecker(targetSpace, reset);
    }

    /**
     * Removes checker from play
     * @param   {Object}    checker - checker being jumped by active player
     */
    removeChecker() {
        document.getElementById(this.id).remove();

        this.isInPlay = false;
        this.space.mark(null);
        this.mark(null);
    }

    /**
     * Moves checker to space provided
     * @param   {Object}    targetSpace - space checker will move to
     * @param   {function}  reset - function to call after checker has been moved
     */
    moveChecker(targetSpace, reset) {
        document.getElementById(this.space.id).classList.toggle('active');
        document.getElementById(this.id).remove();
        this.space.mark(null);
        this.drawHTMLChecker(targetSpace, this.owner.color);
        this.active = false;

        reset();
    }
}