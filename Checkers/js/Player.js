class Player {
    constructor(name, id, color, active = false) {
        this.name = name;
        this.id = id;
        this.color = color;
        this.active = active;
        this.checkers = this.createCheckers(12);
    }

    /**
     * Creates checker objects for player
     * @param   {integer}   num - Number of Checker objects to be created
     * @return  {array}     checkers - an array of new Checker objects
     */
    createCheckers(num) {
        const checkers = [];
        
        for (let i = 0; i < num; i++) {
            let checker = new Checker(i, this);
            checkers.push(checker);
        }
        
        return checkers;
    }

    /**
     * Gets the player's active checker
     * @return  {Object}    checker - player's current active checker
     */
	get activeChecker() {
        return this.checkers.find(checker => checker.active);
    }

    /** 
     * Draws associated HTML checkers for player's checkers
     * @param   {Array}     spaces - array of Space objects to place checkers in
     */
    drawHTMLCheckers(spaces) {
        for (let i=0; i < this.checkers.length; i++) {
            this.checkers[i].drawHTMLChecker(spaces[i], this.color);
        }
    }
}