const fs = require('fs');

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const garden = data.split('\r\n').map((line) =>
        line.split('').map((char) => ({
            value: char,
            visited: false,
        }))
    );

    function isOutOfBounds(row, col) {
        return !(row >= 0 && row < garden.length && col >= 0 && col < garden[0].length);
    }

    function getPerimeter(row, col, value) {
        let perimeter = 0;
        // Up
        if (isOutOfBounds(row - 1, col) || garden[row - 1][col].value != value) {
            perimeter++;
        }
        //Right
        if (isOutOfBounds(row, col + 1) || garden[row][col + 1].value != value) {
            perimeter++;
        }
        //Down
        if (isOutOfBounds(row + 1, col) || garden[row + 1][col].value != value) {
            perimeter++;
        }
        //Left
        if (isOutOfBounds(row, col - 1) || garden[row][col - 1].value != value) {
            perimeter++;
        }
        return perimeter;
    }

    function scanRegion(row, col) {
        let stack = [{ row, col }];
        let area = 0;
        let perimeter = 0;

        while (stack.length > 0) {
            let currentPoint = stack.pop();
            let currentValue = garden[currentPoint.row][currentPoint.col].value;
            garden[currentPoint.row][currentPoint.col].visited = true;
            perimeter += getPerimeter(currentPoint.row, currentPoint.col, currentValue);
            area++;

            const neighbors = [
                { row: currentPoint.row + 1, col: currentPoint.col },
                { row: currentPoint.row - 1, col: currentPoint.col },
                { row: currentPoint.row, col: currentPoint.col + 1 },
                { row: currentPoint.row, col: currentPoint.col - 1 },
            ];

            neighbors.forEach((nextPoint) => {
                if (
                    !isOutOfBounds(nextPoint.row, nextPoint.col) &&
                    garden[nextPoint.row][nextPoint.col].value == currentValue &&
                    garden[nextPoint.row][nextPoint.col].visited == false &&
                    !stack.some((x) => x.row == nextPoint.row && x.col == nextPoint.col)
                ) {
                    stack.push(nextPoint);
                }
            });
        }

        return { area, perimeter };
    }

    let result = 0;
    for (let i = 0; i < garden.length; i++) {
        for (let j = 0; j < garden[0].length; j++) {
            if (garden[i][j].visited == false) {
                // New garden region to check
                let { area, perimeter } = scanRegion(i, j);
                result += area * perimeter;
            }
        }
    }
    console.log(result);
});
