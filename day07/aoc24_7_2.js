const fs = require('fs');

function operatorCombinations(length) {
    const symbols = ['+', '*', '|'];
    const combinations = [];
    const numCombinations = Math.pow(symbols.length, length);
    for (let i = 0; i < numCombinations; i++) {
        let combo = '';
        let temp = i;
        for (let j = 0; j < length; j++) {
            combo = symbols[temp % symbols.length] + combo;
            temp = Math.floor(temp / symbols.length);
        }
        combinations.push(combo);
    }
    return combinations;
}

fs.readFile('input1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const lines = data.split('\r\n');
    let sum = 0;
    lines.forEach((line) => {
        const parts = line.split(': ');
        const result = parseInt(parts[0]);
        const tmp = parts[1].split(' ');
        let operands = [];
        for (let i = 0; i < tmp.length; i++) {
            operands.push(parseInt(tmp[i]));
        }

        const operators = operatorCombinations(operands.length - 1);

        for (let j = 0; j < operators.length; j++) {
            const operatorComb = operators[j];
            let execution = operands[0];
            for (let i = 1; i < operands.length; i++) {
                const currentOperator = operatorComb[i - 1];
                if (currentOperator == '+') {
                    execution = execution + operands[i];
                } else if (currentOperator == '*') {
                    execution = execution * operands[i];
                } else {
                    let b = operands[i].toString();
                    let a = execution.toString();
                    let r = a.concat(b);
                    execution = parseInt(r);
                }
            }
            if (execution == result) {
                sum = sum + result;
                break;
            }
        }
    });
    console.log(sum);
});
