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

    const possibleObstaclePositions = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] == '^') {
                possibleObstaclePositions.push({ row: i, col: j });
            }
        }
    }

    counter = 0;
    possibleObstaclePositions.forEach((obstacle) => {
        let oMap = data.split('\r\n').map((line) => Array.from(line));
        let position = findPosition(oMap, '^');
        let direction = 'up';
        if (position.row == obstacle.row && position.col == obstacle.col) {
            return;
        }
        oMap[obstacle.row][obstacle.col] = '#';
        let loopCheck = [];
        let flag = true;
        while (flag) {
            const nextPosition = getNextPosition(position, direction);

            if (
                loopCheck.some(
                    (a) =>
                        a.row == nextPosition.row &&
                        a.col == nextPosition.col &&
                        a.dir == direction
                )
            ) {
                counter++;
                flag = false;
            } else if (isPositionOutOfMap(oMap, nextPosition)) {
                flag = false;
            } else if (oMap[nextPosition.row][nextPosition.col] == '#') {
                direction = getNextDirection(direction);
            } else if (
                oMap[nextPosition.row][nextPosition.col] == '.' ||
                oMap[nextPosition.row][nextPosition.col] == '^'
            ) {
                position = nextPosition;
                loopCheck.push({
                    row: position.row,
                    col: position.col,
                    dir: direction,
                });
                if (oMap[nextPosition.row][nextPosition.col] == '.') {
                    oMap[nextPosition.row][nextPosition.col] = '^';
                }
            } else {
                console.log('Error in oMap traverse.');
            }
        }
    });
    console.log(counter);
});
