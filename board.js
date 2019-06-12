
class Board{
    constructor (width, height){
        this.width = width;
        this.height = height;
    };

    /**
     * check if robot position is valid
     */
    isValidPosition(pos){
        return pos.x >=0 && pos.y >= 0 && pos.x < this.width && pos.y < this.height; 
    }

    /**
     * board factory
     */
    static createBoard(width, height){
        return new Board(width, height)
    }
}

module.exports = Board;