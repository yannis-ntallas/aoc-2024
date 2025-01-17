const fs = require('fs');

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const matrix = data.split('\n').map((line) => Array.from(line));

    let sum = 0;
    for (let i = 1; i < matrix.length - 1; i++) {
        for (let j = 1; j < matrix[i].length - 1; j++) {
            if (matrix[i][j] == 'A') {
                if (
                    ((matrix[i - 1][j - 1] == 'M' &&
                        matrix[i + 1][j + 1] == 'S') ||
                        (matrix[i - 1][j - 1] == 'S' &&
                            matrix[i + 1][j + 1] == 'M')) &&
                    ((matrix[i - 1][j + 1] == 'M' &&
                        matrix[i + 1][j - 1] == 'S') ||
                        (matrix[i - 1][j + 1] == 'S' &&
                            matrix[i + 1][j - 1] == 'M'))
                ) {
                    sum++;
                }
            }
        }
    }
    console.log(sum);
});
