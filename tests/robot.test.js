var {assert} = require('chai');
var sinon = require('sinon');
var Robot = require('../robot');
var Board = require('../board');
var Logger = require('../logger');

describe('Test Robot functionalities', ()=>{
    it ('should be able to create new robot', ()=>{
        const board = Board.createBoard(5,5);
        const robot = Robot.createRobot(board, Logger);
        const {position, angle, isPlaced, ...props} = robot.props;

        assert.isNotNull(robot);
        assert.equal(position.x, 0);
        assert.equal(position.y, 0);
        assert.equal(angle, 90);
        assert.equal(isPlaced, false);
        assert.equal(board, props.board);
        
    });
    describe('Test Commands', ()=>{
        let board, robot;

        beforeEach(()=>{
            board = Board.createBoard(5,5);
            robot = Robot.createRobot(board, Logger);
            sinon.stub(Logger, "log");
        });

        afterEach(()=>{
            Logger.log.restore();
        });

        describe('PLACE command', ()=>{

            it('should not be able to place if no parameter is passed', ()=>{
                robot.place();
                assert.equal(robot.props.isPlaced, false);
                sinon.assert.calledWithExactly(Logger.log,'Missing Parameters, PLACE X,Y,F');
            });
    
            it('should be able to handle invalid parameters', ()=>{
                robot.place('1,2');
    
                assert.equal(robot.props.isPlaced, false);
                sinon.assert.calledWithExactly(Logger.log,'Invalid Parameters, PLACE X,Y,F');
    
            });
    
            it('should be able to handle invalid cardinal position', ()=>{
                robot.place('1,2,N');

                assert.equal(robot.props.isPlaced, false);
                sinon.assert.calledWithExactly(Logger.log,'Facing Position Invalid');
    
            });
    
            it('should validate if position is invalid', ()=>{
                sinon.stub(board, "isValidPosition").returns(false);
                robot.place('1,2,NORTH');
    
                assert.equal(robot.props.isPlaced, false);
                sinon.assert.calledWithExactly(Logger.log, "Invalid Position");
    
                board.isValidPosition.restore();
            });
    
            it ('should place the robot to the board when command is valid', ()=>{
                sinon.stub(board, "isValidPosition").returns(true);
                robot.place('1,2,NORTH');
    
                assert.equal(robot.props.isPlaced, true);
                sinon.assert.notCalled(Logger.log);
                
                board.isValidPosition.restore();
            });
        })
    
        describe('LEFT command', ()=>{
    
            it('should be rejected when robot is not yet placed on the board', ()=>{
                robot.left();
                sinon.assert.calledWithMatch(Logger.log, 'Must place robot on table first');
            });
    
            it('should move 90 degrees to the left', ()=>{
                robot.place('1,2,NORTH');
                assert.equal(robot.props.angle, Robot.COMPASS.NORTH);

                robot.left();
                assert.equal(robot.props.angle, Robot.COMPASS.WEST);

                robot.left();
                assert.equal(robot.props.angle, Robot.COMPASS.SOUTH);

                robot.left();
                assert.equal(robot.props.angle, Robot.COMPASS.EAST);

                robot.left();
                assert.equal(robot.props.angle, Robot.COMPASS.NORTH);
            });
    
        })
    
        describe('RIGHT command', ()=>{
            it('should be rejected when robot is not yet placed on the board', ()=>{
                robot.right();
                sinon.assert.calledWithMatch(Logger.log, 'Must place robot on table first');
            });
    
            it('should move 90 degrees to the right', ()=>{
                robot.place('1,2,NORTH');
                assert.equal(robot.props.angle, Robot.COMPASS.NORTH);

                robot.right();
                assert.equal(robot.props.angle, Robot.COMPASS.EAST);

                robot.right();
                assert.equal(robot.props.angle, Robot.COMPASS.SOUTH);

                robot.right();
                assert.equal(robot.props.angle, Robot.COMPASS.WEST);

                robot.right();
                assert.equal(robot.props.angle, Robot.COMPASS.NORTH);
            });
        })
    
        describe('MOVE command', ()=>{
            it('should be rejected when robot is not yet placed on the board', ()=>{
                robot.move();
                sinon.assert.calledWithMatch(Logger.log, 'Must place robot on table first');
            });
    
            it('should not allow robot to fall off the board when moving', ()=>{
                robot.place('0,0,SOUTH');
                robot.move();
                sinon.assert.calledWithMatch(Logger.log, 'Invalid Move');
                
                Logger.log.resetHistory();
                robot.place('0,0,WEST');
                robot.move();
                sinon.assert.calledWithMatch(Logger.log, 'Invalid Move');
                
                Logger.log.resetHistory();
                robot.place('4,4,NORTH');
                robot.move();
                sinon.assert.calledWithMatch(Logger.log, 'Invalid Move');
                
                Logger.log.resetHistory();
                robot.place('4,4,EAST');
                robot.move();
                sinon.assert.calledWithMatch(Logger.log, 'Invalid Move');
                
            });
    
            it('should move the robot 1 step forward', ()=>{
                robot.place('0,0,NORTH');
                robot.move();
                assert.equal(robot.props.position.y, 1);
                assert.equal(robot.props.position.x, 0);

                robot.place('0,0,EAST');
                robot.move();
                assert.equal(robot.props.position.x, 1);
                assert.equal(robot.props.position.y, 0);

                robot.place('4,4,SOUTH');
                robot.move();
                assert.equal(robot.props.position.y, 3);
                assert.equal(robot.props.position.x, 4);

                robot.place('4,4,WEST');
                robot.move();
                assert.equal(robot.props.position.x, 3);
                assert.equal(robot.props.position.y, 4);
            });
        });
    
        describe('REPORT command', ()=>{
            it('should be rejected when robot is not yet placed on the board', ()=>{    
                robot.report();
                sinon.assert.calledWithMatch(Logger.log, 'Must place robot on table first');
            });
    
            it('should report the robots position and cardinal position', ()=>{
                robot.place('0,0,NORTH');
                robot.report();
                sinon.assert.calledWithMatch(Logger.log, 'X: 0, Y:0, Facing: NORTH');

                robot.place('2,2,SOUTH');
                robot.report();
                sinon.assert.calledWithMatch(Logger.log, 'X: 2, Y:2, Facing: SOUTH');

            });
        });

        describe("HAPPY PATH", ()=>{
            it('should move from top-left of the table to bottom right, facing NORTH', ()=>{
                robot.place('0,4,SOUTH');
                robot.left();
                robot.move();
                robot.move();
                robot.move();
                robot.move();
                robot.right();
                robot.move();
                robot.move();
                robot.move();
                robot.move();
                robot.right();
                robot.right();
                robot.report();
                sinon.assert.calledWithMatch(Logger.log, 'X: 4, Y:0, Facing: NORTH');
            });
        });
    });


});
