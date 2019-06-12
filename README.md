# ROBOT TEST

A simple robot that can move on a board

## Installation

```bash
npm install
```

## Usage

    to run:
    ```bash
    node index
    ```

## Commands

### PLACE X,Y,F
Place the robot to the board
    X - horizontal position
    Y - vertical position
    F - cardinal position (NORTH, EAST, SOUTH, WEST)

example:
    ```bash
    > PLACE 3,3,SOUTH
    ```

###The following commands can only be used once the robot is placed (PLACE, X,Y,F) on the board

#### MOVE 
Robot moves 1 step forward

    ```bash
    > MOVE
    ```

#### LEFT
Robot rotates 90 degress to the left

    ```bash
    > LEFT
    ```

#### RIGHT
Robot rotates 90 degress to the RIGHT

    ```bash
    > RIGHT
    ```

#### REPORT
Display the position and where the robot is facing, execution is terminated

    ```bash
    > REPORT
    ```

    Example output;
    
    ```bash
    ? > place 1,2,south
    ? > report
    X: 1, Y:2, Facing: SOUTH
    ```