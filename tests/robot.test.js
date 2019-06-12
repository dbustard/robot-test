var assert = require('assert');

describe('Test Robot functionalities', ()=>{
    describe('PLACE command', ()=>{
        it('should not be able to place if no parameter is passed', ()=>{

        });

        it('should be able to handle invalid parameters', ()=>{

        });

        it ('should place the robot to the board when command is valid', ()=>{

        });
    })

    describe('LEFT command', ()=>{
        it('should be rejected when robot is not yet placed on the board', ()=>{

        });

        it('should move 90 degrees to the left', ()=>{

        });

    })

    describe('RIGHT command', ()=>{
        it('should be rejected when robot is not yet placed on the board', ()=>{

        });

        it('should move 90 degrees to the right', ()=>{

        });
    })

    describe('MOVE command', ()=>{
        it('should be rejected when robot is not yet placed on the board', ()=>{

        });

        it('should not allow robot to fall off the board when moving', ()=>{

        });

        it('should move the robot 1 step forward', ()=>{

        });
    });

    describe('REPORT command', ()=>{
        it('should be rejected when robot is not yet placed on the board', ()=>{

        });

        it('should report the robots position and cardinal position', ()=>{

        });
    });
});
