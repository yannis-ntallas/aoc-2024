const fs = require('fs');

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('File does not exist or is corrupted!', err);
        return;
    }

    const matches = [...data.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g)];

    const commands = matches.map((match) => ({
        fullString: match[0],
        x: match[1],
        y: match[2],
    }));

    var isEnabled = true;
    var sum = 0;
    commands.forEach((res) => {
        if (res.fullString == 'do()') {
            isEnabled = true;
        } else if (res.fullString == "don't()") {
            isEnabled = false;
        } else {
            if (isEnabled) {
                sum = sum + res.x * res.y;
            }
        }
    });
    console.log(sum);
});
