class Player {
    constructor(name, id, color, active = false) {
        this.name = name;
        this.id = id;
        this.color = color;
        this.active = active;
        this.pieces = this.createPieces(12);
    }

    /**
     * Creates piece objects for player
     * @param   {integer}   num - Number of Piece objects to be created
     * @return  {array}     pieces - an array of new Piece objects
     */
    createPieces(num) {
        const pieces = [];
        
        for (let i = 0; i < num; i++) {
            let piece = new Piece(i, this);
            pieces.push(piece);
        }
        
        return pieces;
    }
}