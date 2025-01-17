const fs = require('fs');

function processMap(map) {
    let newMap = new Map();
    map.forEach((value, key) => {
        if (key == '0') {
            let newValue = newMap.get('1') ? newMap.get('1') + value : value;
            newMap.set('1', newValue);
        } else if (key.length % 2 == 0) {
            let firstPart = key.slice(0, key.length / 2);
            let secondPart = key.slice(key.length / 2, key.length);
            secondPart = parseInt(secondPart).toString();

            let newValue = newMap.get(firstPart) ? newMap.get(firstPart) + value : value;
            newMap.set(firstPart, newValue);
            newValue = newMap.get(secondPart) ? newMap.get(secondPart) + value : value;
            newMap.set(secondPart, newValue);
        } else {
            newValue = newMap.get((parseInt(key) * 2024).toString())
                ? newMap.get((parseInt(key) * 2024).toString()) + value
                : value;
            newMap.set((parseInt(key) * 2024).toString(), newValue);
        }
    });
    return newMap;
}

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let input = data.split('\r\n')[0].split(' ');

    let map = new Map();

    input.forEach((num) => {
        map.set(num, 1);
    });

    for (let i = 0; i < 75; i++) {
        map = processMap(map);
    }

    let counter = 0;
    map.forEach((value, key) => {
        counter += value;
    });

    console.log(counter);
});
