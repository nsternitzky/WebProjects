class Game {
    constructor() {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
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
        this.ready = true;
    }

    /**
     * Branches code depending on space clicked by player
     * @param   {Object}    event - click event object
     */
    handleClick(event) {
        if (this.ready) {
            //check for active checker
            if (!this.activePlayer.checkers.find(checker => checker.active)) {//no active checker - first click

                //check that player clicked on checker or space with checker
                let checkerDiv = null;
                if (event.target.classList.contains('checker')) {
                    checkerDiv = event.target;
                } else if (event.target.classList.contains('space') && event.target.children[0]) {
                    checkerDiv = event.target.children[0];
                }

                //check that checker belongs to player, then make it active
                if (checkerDiv) {
                    const checker = this.activePlayer.checkers.find(checker => checker.id === checkerDiv.id);
                    if (checker) {
                        checker.active = true;
                        checkerDiv.parentElement.classList.toggle('active');
                    }
                }

            } else {//active checker - second click

            //second click - player clicked empty space - check for valid move, then move

            //second click - player clicked checker directly - invalid move

            //second click - player clicked space with checker - invalid move

            }
        }
    }
}