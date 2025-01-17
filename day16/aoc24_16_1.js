const fs = require('fs');

const directions = [
    { dx: -1, dy: 0, name: 'up' },
    { dx: 1, dy: 0, name: 'down' },
    { dx: 0, dy: -1, name: 'left' },
    { dx: 0, dy: 1, name: 'right' },
];

class PriorityQueue {
    constructor() {
        this.queue = [];
    }
    enqueue(item, priority) {
        this.queue.push({ item, priority });
        this.queue.sort((a, b) => a.priority - b.priority);
    }
    dequeue() {
        return this.queue.shift().item;
    }
    isEmpty() {
        return this.queue.length === 0;
    }
}

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

    const priorityQueue = new PriorityQueue();
    priorityQueue.enqueue({ x: start.x, y: start.y, cost: 0, direction: null }, 0);
    const visitedSteps = [];

    while (!priorityQueue.isEmpty()) {
        const { x, y, cost, direction } = priorityQueue.dequeue();

        if (x == end.x && y == end.y) {
            return cost;
        }

        if (visitedSteps.some((o) => o.x == x && o.y == y && o.direction == direction)) {
            continue;
        } else {
            visitedSteps.push({ x: x, y: y, direction: direction });
        }

        for (const { dx, dy, name } of directions) {
            const newX = x + dx;
            const newY = y + dy;
            const newDirection = name;

            if (isValidPosition(newX, newY, maze)) {
                const turnCost = direction && direction !== newDirection ? 1000 : 0;
                const totalCost = cost + 1 + turnCost;
                priorityQueue.enqueue(
                    { x: newX, y: newY, cost: totalCost, direction: newDirection },
                    totalCost + manhattanDistance(newX, newY, end)
                );
            }
        }
    }

    return null;
}

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const initialTurnCost = 1000; // my maze starts by going up
    const maze = data.split('\r\n').map((row) => row.split(''));

    console.log(findPath(maze) + initialTurnCost);
});
