class Game {
    constructor() {
        this.board = new Board();
        this.players = this.createPlayers();
    }

    /** 
     * Creates two player objects
     * @return  {array}    players - array of two Player objects
     */
    createPlayers() {
        const players = [new Player('Player 1', 1, 'red', true),
                         new Player('Player 2', 2, 'black')];
        return players;
    }

    /** 
     * Returns active player
     * @return  {Object}    player - The active player
     */
	get activePlayer() {
        return this.players.find(player => player.active);
	}  

    /** 
     * Initializes game
     */
    startGame(){
        this.board.drawHTMLBoard();

        //draw player one's checkers
        const playerOneSpaces = [];
        for (let y=0; y < 3; y++) {
            for (let x=0; x < this.board.columns; x++) {
                if ((x % 2 === 1 && y % 2 === 0) ||
                    (x % 2 === 0 && y % 2 === 1)) {
                    playerOneSpaces.push(this.board.spaces[x][y]);
                }
            }
        }
        this.players[0].drawHTMLCheckers(playerOneSpaces);

        //draw player two's checkers
        const playerTwoSpaces = [];
        for (let y=this.board.rows - 1; y > this.board.rows - 4; y--) {
            for (let x=0; x < this.board.columns; x++) {
                if ((x % 2 === 1 && y % 2 === 0) ||
                    (x % 2 === 0 && y % 2 === 1)) {
                    playerTwoSpaces.push(this.board.spaces[x][y]);
                }
            }
        }
        this.players[1].drawHTMLCheckers(playerTwoSpaces);
    }

    /**
     * Branches code depending on space clicked by player
     * @param   {Object}    event - click event object
     */
    handleClick(event) {
        //check for active checker and get HTML element clicked by player
        const activeChecker = this.activePlayer.activeChecker;
        const clickedDiv = this.getClickedDiv(event);

        if (!activeChecker) {//no active checker - first click

            //check that player clicked on a checker
            if (clickedDiv.classList.contains('checker')) {
                const checker = this.activePlayer.checkers.find(checker => checker.id === clickedDiv.id);
                if (checker) {//player clicked their own checker - make it active
                    checker.active = true;
                    clickedDiv.parentElement.classList.toggle('active');
                }
            }

        } else if (clickedDiv.id === activeChecker.id) {//player clicked active checker - make it inactive
            
            activeChecker.active = false;
            clickedDiv.parentElement.classList.toggle('active');

        } else if (clickedDiv.classList.contains('space') &&
                    !clickedDiv.children[0]) {//player clicked empty space - move (if valid move)
            
            this.attemptMove(clickedDiv);

        }
    }

    /**
     * Returns div for item clicked - empty space or checker (including if player clicked space containing checker)
     * @param   {Object}    event - click event object
     * @returns {Object}    clickedDiv - HTML element that player clicked on (or checker in space that player clicked on)
     */
    getClickedDiv(event) {
        let clickedDiv = null;
        if (event.target.classList.contains('space') && event.target.children[0]) {
            clickedDiv = event.target.children[0];
        } else {
            clickedDiv = event.target;
        }
        return clickedDiv;
    }

    /**
     * Checks validity of checker move
     * @param   {Object}    clickedSpaceDiv - HTML space clicked by player
     */
    attemptMove(clickedSpaceDiv) {
        const col = clickedSpaceDiv.id.charAt(6);
        const clickedSpace = this.board.spaces[col].find(space => space.id === clickedSpaceDiv.id);
        const activeCheckerSpace = this.activePlayer.activeChecker.space;

        if (this.activePlayer.id === this.players[0].id) {//player one

            if (clickedSpace.y === activeCheckerSpace.y + 1 &&
                (clickedSpace.x === activeCheckerSpace.x - 1 ||
                clickedSpace.x === activeCheckerSpace.x + 1)) {

                this.moveChecker(clickedSpace);
            }

        } else {//player two
            if (clickedSpace.y === activeCheckerSpace.y - 1 &&
                (clickedSpace.x === activeCheckerSpace.x - 1 ||
                clickedSpace.x === activeCheckerSpace.x + 1)) {
                    
                this.moveChecker(clickedSpace);
            }
        }
    }

    /**
     * Moves checker to space provided
     * @param   {Object}    targetSpace - space checker will move to
     */
    moveChecker(targetSpace) {
        document.getElementById(this.activePlayer.activeChecker.space.id).classList.toggle('active');
        document.getElementById(this.activePlayer.activeChecker.id).remove();
        this.activePlayer.activeChecker.drawHTMLChecker(targetSpace, this.activePlayer.color);
        this.activePlayer.activeChecker.active = false;

        this.updateGameState();
    }

    /**
     * Updates game state after checker is moved
     */
    updateGameState() {
        if (true) {//no win - keep playing

        } else {//win achieved

        }
    }
}