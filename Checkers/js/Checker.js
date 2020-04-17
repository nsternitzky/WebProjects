class Checker {
    constructor(index, owner) {
        this.owner = owner;
        this.id = `checker-${owner.id}-${index}`;
        this.isInPlay = true;
        this.isKing = false;
        this.active = false;
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
    }
}