const fs = require('fs');

function getAntiNodes(ant1, ant2) {
    const rowDist = ant1.row - ant2.row;
    const colDist = ant1.col - ant2.col;
    // console.log({ row: ant1.row + rowDist, col: ant1.col + colDist });
    // console.log({ row: ant2.row - rowDist, col: ant2.col - colDist });
    return {
        a: { row: ant1.row + rowDist, col: ant1.col + colDist },
        b: { row: ant2.row - rowDist, col: ant2.col - colDist },
    };
}

function isAntinodeInRange(antinode, input) {
    return (
        antinode.row >= 0 &&
        antinode.row < input.length &&
        antinode.col >= 0 &&
        antinode.col < input[0].length
    );
}

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const input = data.split('\r\n').map((line) => line.split(''));

    const antennas = [];
    const checked = [];
    for (let i = 0; i < input.length; i++) {
        checked[i] = [];
        for (let j = 0; j < input[0].length; j++) {
            checked[i][j] = false;
            if (input[i][j] != '.') {
                antennas.push({ freq: input[i][j], row: i, col: j });
            }
        }
    }

    console.log(antennas)

    let count = 0;
    antennas.forEach((antenna) => {
        for (let i = 0; i < antennas.length; i++) {
            if (
                antenna.row != antennas[i].row &&
                antenna.col != antennas[i].col &&
                antenna.freq == antennas[i].freq
            ) {
                const antinodes = getAntiNodes(antenna, antennas[i]);
                console.log(antinodes);
                if (isAntinodeInRange(antinodes.a, input)) {
                    if (checked[antinodes.a.row][antinodes.a.col] == false) {
                        count++;
                        checked[antinodes.a.row][antinodes.a.col] = true;
                    }
                }
                if (isAntinodeInRange(antinodes.b, input)) {
                    if (checked[antinodes.b.row][antinodes.b.col] == false) {
                        count++;
                        checked[antinodes.b.row][antinodes.b.col] = true;
                    }
                }
            }
        }
    });
    console.log(count);
});
