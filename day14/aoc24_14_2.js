const fs = require('fs');
const readline = require('readline');

// Create an interface for reading input
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const WIDTH = 101;
const HEIGHT = 103;

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let input = data.split('\r\n');

    let positions = [];
    let velocities = [];

    for (let i = 0; i < input.length; i++) {
        const parts = input[i].split(' ');
        positions.push({
            x: parseInt(parts[0].split('p=')[1].split(',')[0]),
            y: parseInt(parts[0].split('p=')[1].split(',')[1]),
        });
        velocities.push({
            x: parseInt(parts[1].split('v=')[1].split(',')[0]),
            y: parseInt(parts[1].split('v=')[1].split(',')[1]),
        });
    }

    let time = 1;
    process.stdin.on('keypress', (str, key) => {
        if (key.name === 'space') {
            let finalPositions = [];
            for (let i = 0; i < positions.length; i++) {
                let tx = (positions[i].x + velocities[i].x * time) % WIDTH;
                let ty = (positions[i].y + velocities[i].y * time) % HEIGHT;
                tx = tx < 0 ? tx + WIDTH : tx;
                ty = ty < 0 ? ty + HEIGHT : ty;
                finalPositions.push({ x: tx, y: ty });
            }

            let grid = [];
            for (let i = 0; i < WIDTH; i++) {
                grid[i] = [];
                for (let j = 0; j < HEIGHT; j++) {
                    grid[i][j] = ' ';
                }
            }

            for (let i = 0; i < finalPositions.length; i++) {
                grid[finalPositions[i].x][finalPositions[i].y] = 'O';
            }

            console.clear();
            console.log(time.toString().concat(' sec'));
            grid.forEach((row) => {
                console.log(row.join(''));
            });
            time++;
        } else {
            console.log('Exiting...');
            process.exit(); // Exit the program
        }
    });
});
