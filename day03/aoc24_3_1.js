const fs = require('fs');

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('File does not exist or is corrupted!', err);
        return;
    }

    const matches = [...data.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)];

    const commands = matches.map((match) => ({
        x: match[1],
        y: match[2],
    }));

    var sum = 0;
    commands.forEach((res) => {
        sum = sum + res.x * res.y;
    });
    console.log(sum);
});
