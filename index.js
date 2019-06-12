const Board = require('./board');
const Robot = require('./robot');
const inquirer = require('inquirer');

//create new board
const board = Board.createBoard(5,5);

//create new robot
const robot = Robot.createRobot(board);

//exit command
const exit = 'report';

//configure inquirer input
const questions = [
    {
      type: 'input',
      name: 'command',
      message: ">"
    }
];

//prompt user for input
const prompt = () =>{
    inquirer.prompt(questions).then(
        ({command}) =>{

            //take command and arguments
            let [cmd, args] = command.split(' ');
            let result;

            cmd = cmd.toLowerCase();
            //invoke robot command if valid command and  is a function
            if (robot.isValidCommand(cmd) && robot[cmd] instanceof Function){
                result = (robot[cmd](args))

                //if not an exit command, ask for another command
            }else{
                console.log(`invalid command: ${cmd}`);
            }

            //request for new command unless 
            //last command is a successful report
            if (!result || cmd !== exit){
                prompt();   
            }
            
        }
    );
}

prompt();