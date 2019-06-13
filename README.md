# ROBOT TEST

A simple robot that can move on a board
board position 0,0 starts at SOUTH-WEST (bottom-left);

    +---+---+---+---+---+
    |0,4|1,4|2,4|3,4|4,4|
    +---+---+---+---+---+
    |0,3|1,3|2,3|3,3|4,3|
    +---+---+---+---+---+   
    |0,2|1,2|2,2|3,2|4,2|
    +---+---+---+---+---+
    |0,1|1,1|2,1|3,1|4,1|
    +---+---+---+---+---+
    |0,0|1,0|2,0|3,0|4,0|
    +---+---+---+---+---+


## Installation

```
npm install
```

## Usage

    to run:
    ```
    node index
    ```

## Commands

### PLACE X,Y,F
Place the robot to the board
    X - horizontal position
    Y - vertical position
    F - cardinal position (NORTH, EAST, SOUTH, WEST)

example:
    ```
    > PLACE 3,3,SOUTH
    ```

### The following commands can only be used once the robot is placed (PLACE, X,Y,F) on the board

#### MOVE 
Robot moves 1 step forward

    ```
    > MOVE
    ```

#### LEFT
Robot rotates 90 degress to the left

    ```
    > LEFT
    ```

#### RIGHT
Robot rotates 90 degress to the RIGHT

    ```
    > RIGHT
    ```

#### REPORT
Display the position and where the robot is facing, execution is terminated

    ```
    > REPORT
    ```

    Example output;
    
    ```
    ? > place 1,2,south
    ? > report
    X: 1, Y:2, Facing: SOUTH
    ```