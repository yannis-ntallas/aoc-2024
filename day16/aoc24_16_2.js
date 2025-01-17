const fs = require('fs');

const directions = [
    { dx: -1, dy: 0, name: 'up' },
    { dx: 1, dy: 0, name: 'down' },
    { dx: 0, dy: -1, name: 'left' },
    { dx: 0, dy: 1, name: 'right' },
];

function findStart(maze) {
    let result;
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[0].length; j++) {
            if (maze[i][j] === 'S') result = { x: i, y: j };
        }
    }
    return result;
}

function findEnd(maze) {
    let result;
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[0].length; j++) {
            if (maze[i][j] === 'E') result = { x: i, y: j };
        }
    }
    return result;
}

function manhattanDistance(x, y, end) {
    return Math.abs(x - end.x) + Math.abs(y - end.y);
}

function isValidPosition(x, y, maze) {
    return x >= 0 && y >= 0 && x < maze.length && y < maze[0].length && maze[x][y] !== '#';
}

function findPath(maze) {
    let start = findStart(maze);
    let end = findEnd(maze);
    let minCost = Infinity;
    const paths = [];    
    
    function bfs() {
        const queue = [{ x: start.x, y: start.y, path: [], cost: 0, prevDir: null }];
        const visited = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(false));

        while (queue.length > 0) {
            const { x, y, path, cost, prevDir } = queue.shift();

            // If out of bounds or on a wall, continue
            if (x < 0 || y < 0 || x >= maze.length || y >= maze[0].length || maze[x][y] === '#' || visited[x][y]) {
                continue;
            }

            // If we reached the end, save the path and cost
            if (x === end.x && y === end.y) {
                paths.push({ path: path.slice(), cost });
                if (cost < minCost) minCost = cost;
                continue;
            }

            // Mark the current cell as visited
            visited[x][y] = true;

            // Explore all possible directions
            for (const { dx, dy, dir } of directions) {
                const newX = x + dx;
                const newY = y + dy;
                const turnCost = prevDir && prevDir !== dir ? 1000 : 0;

                queue.push({
                    x: newX,
                    y: newY,
                    path: [...path, dir],
                    cost: cost + 1 + turnCost,
                    prevDir: dir
                });
            }
        }
    }

    bfs();

    return { paths, minCost };
}

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const initialTurnCost = 1000; // my maze starts by going up
    const maze = data.split('\r\n').map((row) => row.split(''));

    const { paths, minCost } = findPath(maze);

    console.log(minCost);
});
