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
        space.mark(this);
        this.mark(space);
    }

    /**
     * Updates checker to reflect space it's been placed on
     * @param   {Object}    space - space where checked has been placed
     */
	mark(space) {
		this.space = space;
	}
}