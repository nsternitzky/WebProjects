class Space {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = `space-${x}-${y}`;
    }

    /**
     * Draws HTML space
     */
	drawHTMLSpace() {    
        const HTMLSpace = document.createElement('div');
        HTMLSpace.setAttribute('id', this.id);
        HTMLSpace.classList.add('space');

        if ((this.x % 2 === 0 && this.y % 2 === 0) ||
            (this.x % 2 === 1 && this.y % 2 === 1)) {
            HTMLSpace.classList.add('light');
        } else {
            HTMLSpace.classList.add('dark');
        }

        document.querySelector('#game-board').appendChild(HTMLSpace);
    }
}