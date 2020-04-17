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
        // this.ready = true;
    }
}