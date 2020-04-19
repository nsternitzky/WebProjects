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
        const row = clickedSpaceDiv.id.charAt(8);
        const clickedSpace = this.board.spaces[col][row];
        const activeChecker = this.activePlayer.activeChecker;
        const activeCheckerSpace = activeChecker.space;
        const game = this;
        let opponentChecker = null;

        if (this.activePlayer.id === this.players[0].id) {//player one

            if (clickedSpace.y === activeCheckerSpace.y + 1 &&
                (clickedSpace.x === activeCheckerSpace.x - 1 ||
                clickedSpace.x === activeCheckerSpace.x + 1)) {//basic move forward

                activeChecker.moveChecker(clickedSpace, function() {
                    game.updateGameState();
                });

            } else if (clickedSpace.y === activeCheckerSpace.y + 2 &&
                    (
                        (clickedSpace.x === activeCheckerSpace.x - 2 &&
                            (opponentChecker = this.checkForOpponentChecker(activeCheckerSpace.x - 1, activeCheckerSpace.y + 1))
                        )
                        ||
                        (clickedSpace.x === activeCheckerSpace.x + 2 && 
                            (opponentChecker = this.checkForOpponentChecker(activeCheckerSpace.x + 1, activeCheckerSpace.y + 1))
                        )
                    )
                ) {//jump opponent's checker

                activeChecker.jumpChecker(clickedSpace, opponentChecker, function() {
                    game.updateGameState();
                });

            }

        } else {//player two
            if (clickedSpace.y === activeCheckerSpace.y - 1 &&
                (clickedSpace.x === activeCheckerSpace.x - 1 ||
                clickedSpace.x === activeCheckerSpace.x + 1)) {//basic move forward
                    
                activeChecker.moveChecker(clickedSpace, function() {
                    game.updateGameState();
                });

            } else if (clickedSpace.y === activeCheckerSpace.y - 2 &&
                    (
                        (clickedSpace.x === activeCheckerSpace.x - 2 && 
                            (opponentChecker = this.checkForOpponentChecker(activeCheckerSpace.x - 1, activeCheckerSpace.y - 1))
                        )
                        ||
                        (clickedSpace.x === activeCheckerSpace.x + 2 && 
                            (opponentChecker = this.checkForOpponentChecker(activeCheckerSpace.x + 1, activeCheckerSpace.y - 1))
                        )
                    )
                ) {//jump opponent's checker

                activeChecker.jumpChecker(clickedSpace, opponentChecker, function() {
                    game.updateGameState();
                });

            }
        }
    }

    /**
     * Checks space located at (x,y) for opponent's checker
     * @param   {integer}       x - x coordinate of space to be checked
     * @param   {integer}       y - y coordinate of space to be checked
     * @returns {Object | null} checker - opponent's checker in indicated space (if there is one)
     */
    checkForOpponentChecker(x,y) {
        let checker = null;
        const space = this.board.spaces[x][y];
        if (space.checker && space.checker.owner !== this.activePlayer) {
            checker = space.checker;
        }
        return checker;
    }

    /**
     * Updates game state after checker is moved
     */
    updateGameState() {
        if (true) {//no win - keep playing

            this.switchPlayers();

        } else {//win achieved

        }
    }

    /** 
     * Switches active player
     */
	switchPlayers() {
		for (let player of this.players) {
			player.active = player.active === true ? false : true;
		}
    }
}