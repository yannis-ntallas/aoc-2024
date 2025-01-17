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

    sum = 0;
    pageSets.forEach((set) => {
        const pages = set.split(',');
        let isValid = true;
        for (let i = 0; i < pages.length; i++) {
            for (let j = i + 1; j < pages.length; j++) {
                if (rules.includes(pages[j] + '|' + pages[i])) {
                    isValid = false;
                }
            }
        }
        if (isValid) {
            sum += parseInt(pages[Math.round((pages.length - 1) / 2)]);
        }
    });
    console.log(sum);
});
