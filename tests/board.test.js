var { assert } = require('chai');
var Board = require('../board');

describe('Board functionalities', ()=>{

    it('should set board size when initialized', ()=>{
        const board = Board.createBoard(5,5);
        const {width, height} = board.props;
        assert.isNotNull(board);
        assert.equal(width, 5);
        assert.equal(height, 5);
    });

    describe('isValidPosition method', ()=>{
        let board;
        beforeEach(()=>{
            board = Board.createBoard(5,5);
        });
        it('should not allow horizontal position to be less than 0', ()=>{
            const position = {x: -1, y: 3}
            result = board.isValidPosition(position);
            assert.isNotTrue(result);
        });

        it('should not allow vertical position to be less than 0', ()=>{
            const position = {x: 1, y: -3}
            result = board.isValidPosition(position);
            assert.isNotTrue(result);

        });

        it('should not allow position to be more than the width', ()=>{
            const position = {x: 5, y: 0}
            result = board.isValidPosition(position);
            assert.isNotTrue(result);

        });

        it('should not allow position to be more than the height', ()=>{
            const position = {x: 4, y: 5}
            result = board.isValidPosition(position);
            assert.isNotTrue(result);

        });

        it('should allow position as long as it is within the board dimension', ()=>{
            let position = {x: 2, y: 2}
            result = board.isValidPosition(position);
            assert.isTrue(result);

            position = {x: 0, y: 0}
            result = board.isValidPosition(position);
            assert.isTrue(result);

            position = {x: 4, y: 4}
            result = board.isValidPosition(position);
            assert.isTrue(result);
        });
    })


});