
class Board{
    constructor (width, height){
        this.props = {width, height};
    };

    /**
     * check if robot position is valid
     */
    isValidPosition(pos){
        return pos.x >=0 && pos.y >= 0 && pos.x < this.props.width && pos.y < this.props.height; 
    }

    /**
     * board factory
     */
    static createBoard(width, height){
        return new Board(width, height)
    }
}

module.exports = Board;