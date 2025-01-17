const fs = require('fs');

function prune(secretNumber) {
    return ((secretNumber % 16777216) + 16777216) % 16777216;
}

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const lines = data.split('\r\n');

    let res = 0;
    lines.forEach((line) => {
        let secretNumber = parseInt(line);

        for (let i = 0; i < 2000; i++) {
            //step 1
            let t1 = secretNumber * 64;
            let t2 = t1 ^ secretNumber;
            secretNumber = prune(t2);

            //step 2
            t1 = Math.floor(secretNumber / 32);
            t2 = t1 ^ secretNumber;
            secretNumber = prune(t2);

            //step 3
            t1 = secretNumber * 2048;
            t2 = t1 ^ secretNumber;
            secretNumber = prune(t2);
        }
        res += secretNumber;
    });
    console.log(res);
});
