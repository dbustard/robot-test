const COMMANDS = ['place', 'move', 'left', 'right', 'report'];
const COMPASS = {'NORTH': 90, 'EAST': 0, 'SOUTH': -90, 'WEST': -180};

class Robot {
    constructor(board){
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
            console.log('missing parameters');
            return;
        }
        let [x,y,facing] = args.split(",");
        if (!x || !y || !facing){
            console.log('invalid parameters')
            return;
        }
        x = parseInt(x);
        y = parseInt(y);
        facing = facing.toUpperCase().trim();
        if (COMPASS[facing] === undefined){
            console.log('facing position invalid');
            return;
        }
        if (!this.props.board.isValidPosition({x,y})){
            console.log('invalid position');
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
                console.log('invalid position',pos)
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
            
            console.log(`X: ${position.x}, Y:${position.y}, Facing: ${facing}` );
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
            console.log(`Unexpected Arguments: ${args} `);
        }
        return !args;
    }

    /**
     * check if robot is placed to the table
     */
    isPlaced(){
        const {isPlaced} = this.props;
        if (!isPlaced){
            console.log('Must place robot to table first');
        }
        return isPlaced;
    }

    /**
     * robot factory
     */
    static createRobot(board){
        return new Robot(board);
    }
}

module.exports = Robot;