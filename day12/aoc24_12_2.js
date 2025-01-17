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

    function getSides(row, col, value) {
        let sides = 0;

        // Up + Right
        if (
            (
                (isOutOfBounds(row - 1, col) || garden[row - 1][col].value != value) &&
                (isOutOfBounds(row, col + 1) || garden[row][col + 1].value != value)
            ) ||
            (
                (!isOutOfBounds(row - 1, col) && garden[row - 1][col].value == value) &&
                (!isOutOfBounds(row, col + 1) && garden[row][col + 1].value == value) &&
                (isOutOfBounds(row - 1, col + 1) || garden[row - 1][col + 1].value != value)
            )
        ) {
            sides++;
        }
         // Right + Down
        if (
            (
                (isOutOfBounds(row, col + 1) || garden[row][col + 1].value != value) &&
                (isOutOfBounds(row + 1, col) || garden[row + 1][col].value != value)
            ) ||
            (
                (!isOutOfBounds(row, col + 1) && garden[row][col + 1].value == value) &&
                (!isOutOfBounds(row + 1, col) && garden[row + 1][col].value == value) &&
                (isOutOfBounds(row + 1, col + 1) || garden[row + 1][col + 1].value != value)
            )
        ) {
            sides++;
        }
        // Down + Left
        if (
            (
                (isOutOfBounds(row + 1, col) || garden[row + 1][col].value != value) &&
                (isOutOfBounds(row, col - 1) || garden[row][col - 1].value != value)
            ) ||
            (
                (!isOutOfBounds(row + 1, col) && garden[row + 1][col].value == value) &&
                (!isOutOfBounds(row, col - 1) && garden[row][col - 1].value == value) &&
                (isOutOfBounds(row + 1, col - 1) || garden[row + 1][col - 1].value != value)
            )
        ) {
            sides++;
        }
        // Left + Up
        if (
            (
                (isOutOfBounds(row, col - 1) || garden[row][col - 1].value != value) &&
                (isOutOfBounds(row - 1, col) || garden[row - 1][col].value != value)
            ) ||
            (
                (!isOutOfBounds(row, col - 1) && garden[row][col - 1].value == value) &&
                (!isOutOfBounds(row - 1, col) && garden[row - 1][col].value == value) &&
                (isOutOfBounds(row - 1, col - 1) || garden[row - 1][col - 1].value != value)
            )
        ) {
            sides++;
        }
        return sides;
    }

    function scanRegion(row, col) {
        let stack = [{ row, col }];
        let area = 0;
        let sides = 0;

        while (stack.length > 0) {
            let currentPoint = stack.pop();
            let currentValue = garden[currentPoint.row][currentPoint.col].value;
            garden[currentPoint.row][currentPoint.col].visited = true;
            sides += getSides(currentPoint.row, currentPoint.col, currentValue);
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

        return { area, sides };
    }

    let result = 0;
    for (let i = 0; i < garden.length; i++) {
        for (let j = 0; j < garden[0].length; j++) {
            if (garden[i][j].visited == false) {
                // New garden region to check
                let { area, sides } = scanRegion(i, j);
                result += area * sides;
            }
        }
    }
    console.log(result);
});
