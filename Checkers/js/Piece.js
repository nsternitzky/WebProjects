class Piece {
    constructor(index, owner) {
        this.owner = owner;
        this.id = `piece-${owner.id}-${index}`;
        this.isInPlay = true;
        this.isKing = false;
    }
}