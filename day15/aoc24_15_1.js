const fs = require('fs');

function printGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        console.log(grid[i].join(''));
    }
    console.log(' ');
}

function initializeGrid(input) {
    let grid = [];
    for (let i = 0; i < 50; i++) {
        grid[i] = input[i].split('');
    }
    return grid;
}

function parseMoves(input) {
    let moves = '';
    for (let i = 51; i < 71; i++) {
        moves = moves.concat(input[i]);
    }
    return moves;
}
function findRobotStart(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == '@') {
                return { x: i, y: j };
            }
        }
    }
    console.error('Cannot find robot!');
    return { x: -1, y: -1 };
}

const directionTransformation = {
    '^': { x: -1, y: 0 },
    v: { x: 1, y: 0 },
    '>': { x: 0, y: 1 },
    '<': { x: 0, y: -1 },
};

function isWall(position, grid) {
    return grid[position.x][position.y] == '#';
}

function isBox(position, grid) {
    return grid[position.x][position.y] == 'O';
}

function isFree(position, grid) {
    return grid[position.x][position.y] == '.';
}

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const input = data.split('\r\n');
    let grid = initializeGrid(input);
    let moves = parseMoves(input);

    let robotPosition = findRobotStart(grid);
    for (let i = 0; i < moves.length; i++) {
        const direction = directionTransformation[moves[i]];
        let newPosition = {
            x: robotPosition.x + direction.x,
            y: robotPosition.y + direction.y,
        };
        if (isWall(newPosition, grid)) {
            continue;
        }
        if (isFree(newPosition, grid)) {
            grid[newPosition.x][newPosition.y] = '@';
            grid[robotPosition.x][robotPosition.y] = '.';
            robotPosition = newPosition;
            continue;
        }
        if (isBox(newPosition, grid)) {
            let tmp = {
                x: newPosition.x + direction.x,
                y: newPosition.y + direction.y,
            };
            let flag = true;
            while (flag) {
                if (isWall(tmp, grid)) {
                    flag = false;
                } else if (isFree(tmp, grid)) {
                    grid[tmp.x][tmp.y] = 'O';
                    grid[robotPosition.x][robotPosition.y] = '.';
                    grid[newPosition.x][newPosition.y] = '@';
                    robotPosition = newPosition;
                    flag = false;
                } else if (isBox(tmp, grid)) {
                    tmp = {
                        x: tmp.x + direction.x,
                        y: tmp.y + direction.y,
                    };
                }
            }
        }
    }

    let result = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 'O') {
                result += i * 100 + j;
            }
        }
    }

    console.log(result);
});
