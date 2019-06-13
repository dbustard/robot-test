const COMMANDS = ['place', 'move', 'left', 'right', 'report'];
const COMPASS = {'NORTH': 90, 'EAST': 0, 'SOUTH': -90, 'WEST': -180};

class Robot {

    constructor(board, logger){
        this.logger = logger;
        this.props = {
            position: {
                x: 0,
                y: 0
            },
            angle: 90,
            board: board,
            isPlaced: false,            
        };        
    }

    /**
     * COMMAND: PLACE X,Y,F
     * Place the robot to the table
     * ARGS:
     *  X: horital position
     *  Y: vertical position
     *  F: cardical position (NORTH, EAST, SOUTH, WEST)
     */
    place(args){
        if (!args){
            this.logger.log('Missing Parameters, PLACE X,Y,F');
            return;
        }
        let [x,y,facing] = args.split(",");
        if (!x || !y || !facing){
            this.logger.log('Invalid Parameters, PLACE X,Y,F')
            return;
        }
        x = parseInt(x);
        y = parseInt(y);
        facing = facing.toUpperCase().trim();
        if (COMPASS[facing] === undefined){
            this.logger.log('Facing Position Invalid');
            return;
        }
        if (!this.props.board.isValidPosition({x,y})){
            this.logger.log('Invalid Position');
            return;
        }
        
        this.props.position.x = x;
        this.props.position.y = y;
        this.props.angle = COMPASS[facing];
        this.props.isPlaced = true;
    }

    /**
     * COMMAND: MOVE
     * move the robot 1 step forward
     */
    move(args){
        if (!this.isPlaced()) return;
        if (this.noArgs(args)){
            const {angle} = this.props;
            const sign = angle / Math.abs(angle) || 1;
            const axis = (angle === 90 || angle === -90) ? 'y' : 'x';

            //sign * number of steps
            const move = sign*1;

            //clone the current position;
            const pos =  Object.assign({}, this.props.position)
            
            //move simulate moving robot;
            pos[axis] = this.props.position[axis] + move;
            
            //check if the simulated move if valid
            if (this.props.board.isValidPosition(pos)){
                this.props.position = pos;
            }else{
                this.logger.log('Invalid Move');
            }
        }
    }

    /**
     * COMMAND: LEFT
     * rotate robot 90 degrees to the left
     */
    left(args){
        if (!this.isPlaced()) return;
        if (this.noArgs(args)){
            this.rotate(90);
        }
    }

    /**
     * COMMAND: RIGHT
     * rotate robot 90 degrees to the right
     */
    right(args){
        if (!this.isPlaced()) return;
        if (this.noArgs(args)){
            this.rotate(-90);
        }
    }

    /**
     * rotate robot by the given angle 
     */
    rotate(rotateBy){
        this.props.angle = this.props.angle + rotateBy;
        //todo: change to a mathematical formula to converting 
        //angle to quadrant 
        if (this.props.angle >= 180){
            this.props.angle = -180;
        }else if (this.props.angle < -180){
            this.props.angle = 90;
        }
    }

    /**
     * COMMMAND: REPORT
     * display the position and where the robot is facing
     */
    report(args){
        if (!this.isPlaced()) return;
        if (this.noArgs(args)){

            const {position, angle} = this.props;
            //convert angle to cardinal directions
            const facing = Object.keys(COMPASS).find(f => COMPASS[f] === angle) || "UNKOWN";
            
            this.logger.log(`X: ${position.x}, Y:${position.y}, Facing: ${facing}` );
            return true;
        }
    }

    /**
     * check if the command is valid
     */
    isValidCommand(cmd){
        return COMMANDS.find(c=> c === cmd) !== undefined; 
    }

    /**
     * check if command has args
     */
    noArgs(args){
        if (args){
            this.logger.log(`Unexpected Arguments: ${args} `);
        }
        return !args;
    }

    /**
     * check if robot is placed to the table
     */
    isPlaced(){
        const {isPlaced} = this.props;
        if (!isPlaced){
            this.logger.log('Must place robot on table first');
        }
        return isPlaced;
    }

    /**
     * robot factory
     */
    static createRobot(logger, board){
        return new Robot(logger, board);
    }

}

module.exports = Robot;
module.exports.COMPASS = COMPASS;