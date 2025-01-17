const fs = require('fs');

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.split('\r\n');
    const rules = lines.filter((line) => {
        if (line.includes('|')) {
            return line;
        }
    });

    const pageSets = lines.filter((line) => {
        if (line.includes(',')) {
            return line;
        }
    });

    const isValidSet = function (pages) {
        for (let i = 0; i < pages.length; i++) {
            for (let j = i + 1; j < pages.length; j++) {
                if (rules.includes(pages[j] + '|' + pages[i])) {
                    return { isValid: false, i: i, j: j };
                }
            }
        }
        return { isValid: true, i: 0, j: 0 };
    };

    sum = 0;
    pageSets.forEach((set) => {
        const pages = set.split(',');
        let res = isValidSet(pages);
        const shouldAdd = !res.isValid;
        while (!res.isValid) {
            let tmp = pages[res.i];
            pages[res.i] = pages[res.j];
            pages[res.j] = tmp;
            res = isValidSet(pages);
        }
        if (shouldAdd) {
            sum += parseInt(pages[Math.round((pages.length - 1) / 2)]);
        }
    });
    console.log(sum);
});
