const fs = require('fs');

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const matrix = data.split('\n').map((line) => Array.from(line));

    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 'X') {
                // |
                if (
                    i - 3 >= 0 &&
                    matrix[i - 1][j] == 'M' &&
                    matrix[i - 2][j] == 'A' &&
                    matrix[i - 3][j] == 'S'
                ) {
                    sum++;
                }
                // /
                if (
                    i - 3 >= 0 &&
                    j + 3 < matrix[i].length &&
                    matrix[i - 1][j + 1] == 'M' &&
                    matrix[i - 2][j + 2] == 'A' &&
                    matrix[i - 3][j + 3] == 'S'
                ) {
                    sum++;
                }
                // -
                if (
                    j + 3 < matrix[i].length &&
                    matrix[i][j + 1] == 'M' &&
                    matrix[i][j + 2] == 'A' &&
                    matrix[i][j + 3] == 'S'
                ) {
                    sum++;
                }
                // \
                if (
                    i + 3 < matrix.length &&
                    j + 3 < matrix[i].length &&
                    matrix[i + 1][j + 1] == 'M' &&
                    matrix[i + 2][j + 2] == 'A' &&
                    matrix[i + 3][j + 3] == 'S'
                ) {
                    sum++;
                }
                // |
                if (
                    i + 3 < matrix.length &&
                    matrix[i + 1][j] == 'M' &&
                    matrix[i + 2][j] == 'A' &&
                    matrix[i + 3][j] == 'S'
                ) {
                    sum++;
                }
                // /
                if (
                    i + 3 < matrix.length &&
                    j - 3 >= 0 &&
                    matrix[i + 1][j - 1] == 'M' &&
                    matrix[i + 2][j - 2] == 'A' &&
                    matrix[i + 3][j - 3] == 'S'
                ) {
                    sum++;
                }
                // -
                if (
                    j - 3 >= 0 &&
                    matrix[i][j - 1] == 'M' &&
                    matrix[i][j - 2] == 'A' &&
                    matrix[i][j - 3] == 'S'
                ) {
                    sum++;
                }
                // \
                if (
                    i - 3 >= 0 &&
                    j - 3 >= 0 &&
                    matrix[i - 1][j - 1] == 'M' &&
                    matrix[i - 2][j - 2] == 'A' &&
                    matrix[i - 3][j - 3] == 'S'
                ) {
                    sum++;
                }
            }
        }
    }
    console.log(sum);
});
