const fs = require('fs');

const ROWS = 70;
const COLS = 70;

function findShortestPath(grid) {
    const start = [0, 0];
    const end = [70, 70];

    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    const isValid = (row, col) => {
        return row >= 0 && row <= ROWS && col >= 0 && col <= COLS && grid[row][col] === '.';
    };

    const manhattanDistance = (row, col) => {
        return Math.abs(row - end[0]) + Math.abs(col - end[1]);
    };

    const priorityQueue = [];

    priorityQueue.push({ position: start, cost: 0, path: [start] });

    const visited = new Set();
    visited.add(`${start[0]}-${start[1]}`);

    while (priorityQueue.length > 0) {
        priorityQueue.sort(
            (a, b) =>
                a.cost +
                manhattanDistance(...a.position) -
                (b.cost + manhattanDistance(...b.position))
        );

        const current = priorityQueue.shift();
        const [currentRow, currentCol] = current.position;

        if (currentRow === end[0] && currentCol === end[1]) {
            return current.path;
        }

        for (const [dRow, dCol] of directions) {
            const newRow = currentRow + dRow;
            const newCol = currentCol + dCol;

            if (isValid(newRow, newCol) && !visited.has(`${newRow}-${newCol}`)) {
                visited.add(`${newRow}-${newCol}`);
                priorityQueue.push({
                    position: [newRow, newCol],
                    cost: current.cost + 1,
                    path: [...current.path, [newRow, newCol]],
                });
            }
        }
    }

    return [];
}

function createGrid(obstacles, limit) {
    let grid = [];
    for (let i = 0; i <= ROWS; i++) {
        grid[i] = [];
        for (let j = 0; j <= COLS; j++) {
            grid[i][j] = '.';
        }
    }
    for (let i = 0; i < limit; i++) {
        grid[obstacles[i].row][obstacles[i].col] = '#';
    }
    return grid;
}

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    input = data.split('\r\n').map((o) => {
        let t = o.split(',');
        return { row: t[1], col: t[0] };
    });

    for (let i = 1024; i < input.length; i++) {
        let grid = createGrid(input, i);
        let path = findShortestPath(grid);
        console.log(i.toString() + ', ' + (path.length - 1).toString());
        console.log(path.length - 1);
        if (path.length == 0) {
            console.log('END');
            console.log(input[i-1].row.toString() + ', ' + input[i-1].col.toString())
            break;
        }
    }
});
