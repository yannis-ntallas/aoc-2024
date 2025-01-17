const fs = require('fs');

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const input = data.split('\r\n');

    let offset = 0;
    let tokens = 0;
    while (offset + 2 <= input.length) {
        let buttonA = input[offset];
        let buttonB = input[offset + 1];
        let prize = input[offset + 2];

        let a = parseInt(buttonA.split('Button A: ')[1].split(', ')[0].split('X+')[1]);
        let b = parseInt(buttonB.split('Button B: ')[1].split(', ')[0].split('X+')[1]);

        let c = parseInt(buttonA.split('Button A: ')[1].split(', ')[1].split('Y+')[1]);
        let d = parseInt(buttonB.split('Button B: ')[1].split(', ')[1].split('Y+')[1]);

        let e = parseInt(prize.split('Prize: ')[1].split(', ')[0].split('X=')[1]);
        let f = parseInt(prize.split('Prize: ')[1].split(', ')[1].split('Y=')[1]);

        e = 10000000000000 + e;
        f = 10000000000000 + f;

        let x = 0;
        let y = 0;
        const t = a * d - b * c;
        const exp1 = d * e - b * f;
        const exp2 = a * f - c * e;
        if (t != 0) {
            if (exp1 % t == 0 && exp2 % t == 0) {
                x = exp1 / t;
                y = exp2 / t;

                tokens += 3 * x + y;
            }
        }

        offset += 4;
    }
    console.log(tokens);
});
