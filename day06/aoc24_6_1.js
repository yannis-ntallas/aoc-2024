const fs = require('fs');

function getNextDirection(direction) {
    if (direction == 'up') {
        return 'right';
    }
    if (direction == 'right') {
        return 'down';
    }
    if (direction == 'left') {
        return 'up';
    }
    if (direction == 'down') {
        return 'left';
    }
    console.log('Error in direction');
    return null;
}

function findPosition(array, target) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] === target) {
                return { row: i, col: j };
            }
        }
    }
    return null;
}

function getNextPosition(currentPosition, direction) {
    if (direction == 'up') {
        return { row: currentPosition.row - 1, col: currentPosition.col };
    }
    if (direction == 'right') {
        return { row: currentPosition.row, col: currentPosition.col + 1 };
    }
    if (direction == 'left') {
        return { row: currentPosition.row, col: currentPosition.col - 1 };
    }
    if (direction == 'down') {
        return { row: currentPosition.row + 1, col: currentPosition.col };
    }
    console.log('Error in position');
    return null;
}

function isPositionOutOfMap(map, position) {
    return (
        position.row < 0 ||
        position.row >= map.length ||
        position.col < 0 ||
        position.col >= map[0].length
    );
}

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let map = data.split('\r\n').map((line) => Array.from(line));

    let position = findPosition(map, '^');
    let direction = 'up';

    let counter = 1;
    let flag = true;
    while (flag) {
        const nextPosition = getNextPosition(position, direction);
        if (isPositionOutOfMap(map, nextPosition)) {
            flag = false;
        } else if (map[nextPosition.row][nextPosition.col] == '#') {
            direction = getNextDirection(direction);
        } else if (
            map[nextPosition.row][nextPosition.col] == '.' ||
            map[nextPosition.row][nextPosition.col] == '^'
        ) {
            position = nextPosition;
            if (map[nextPosition.row][nextPosition.col] == '.') {
                counter++;
                map[nextPosition.row][nextPosition.col] = '^';
            }
        } else {
            console.log('Error in map traverse.');
        }
    }
    console.log(counter);
});
