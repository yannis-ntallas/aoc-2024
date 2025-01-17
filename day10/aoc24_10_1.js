const fs = require('fs');

function isValidPoint(point, map) {
    return point.row >= 0 && point.row < map.length && point.col >= 0 && point.col < map[0].length;
}

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let trailends = 0;

    function trailWalk(map, startPoint) {
        let stack = [startPoint];
        let visited = new Set();

        while (stack.length > 0) {
            let currentPoint = stack.pop();

            // Skip already visited points
            let key = `${currentPoint.row},${currentPoint.col}`;
            if (visited.has(key)) {
                continue;
            }
            visited.add(key);

            if (!isValidPoint(currentPoint, map)) {
                continue;
            }

            let currentValue = parseInt(map[currentPoint.row][currentPoint.col]);
            if (isNaN(currentValue) || map[currentPoint.row][currentPoint.col] === '.') {
                continue;
            }

            if (currentValue === 9) {
                trailends++;
                continue;
            }

            // Add neighbors to the stack if the step difference is valid
            const neighbors = [
                { row: currentPoint.row + 1, col: currentPoint.col },
                { row: currentPoint.row - 1, col: currentPoint.col },
                { row: currentPoint.row, col: currentPoint.col + 1 },
                { row: currentPoint.row, col: currentPoint.col - 1 },
            ];

            neighbors.forEach((nextPoint) => {
                if (isValidPoint(nextPoint, map)) {
                    let nextValue = parseInt(map[nextPoint.row][nextPoint.col]);
                    if (!isNaN(nextValue) && nextValue - currentValue === 1) {
                        stack.push(nextPoint);
                    }
                }
            });
        }
    }

    let map = data.split('\r\n').map((line) => Array.from(line));

    const trailheads = [];

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == '0') {
                trailheads.push({ row: i, col: j });
            }
        }
    }

    trailheads.forEach((trailhead) => {
        trailWalk(map, trailhead);
    });

    console.log(trailends);
});
