const fs = require('fs');

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

    let finalPositions = [];
    for (let i = 0; i < positions.length; i++) {
        let tx = (positions[i].x + velocities[i].x * 100) % WIDTH;
        let ty = (positions[i].y + velocities[i].y * 100) % HEIGHT;
        tx = tx < 0 ? tx + WIDTH : tx;
        ty = ty < 0 ? ty + HEIGHT : ty;
        finalPositions.push({ x: tx, y: ty });
    }

    let grid = [];
    for (let i = 0; i < WIDTH; i++) {
        grid[i] = [];
        for (let j = 0; j < HEIGHT; j++) {
            grid[i][j] = 0;
        }
    }

    for (let i = 0; i < finalPositions.length; i++) {
        grid[finalPositions[i].x][finalPositions[i].y] += 1;
    }

    let q1 = 0;
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 51; j++) {
            q1 += grid[i][j];
        }
    }

    let q2 = 0;
    for (let i = 51; i < 101; i++) {
        for (let j = 0; j < 51; j++) {
            q2 += grid[i][j];
        }
    }

    let q3 = 0;
    for (let i = 0; i < 50; i++) {
        for (let j = 52; j < 103; j++) {
            q3 += grid[i][j];
        }
    }

    let q4 = 0;
    for (let i = 51; i < 101; i++) {
        for (let j = 52; j < 103; j++) {
            q4 += grid[i][j];
        }
    }

    console.log(q1 * q2 * q3 * q4);
});
