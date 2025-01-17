let regA = 0n;
let regB = 0n;
let regC = 0n;
let program = [];
let instruction = 0n;
let output = [];

function getComboOperand(operand) {
    const bigOperand = BigInt(operand);
    if (0n <= bigOperand && bigOperand <= 3n) {
        return bigOperand;
    }
    if (bigOperand === 4n) {
        return regA;
    }
    if (bigOperand === 5n) {
        return regB;
    }
    if (bigOperand === 6n) {
        return regC;
    }
}

function adv(operand) {
    const numerator = regA;
    const denominator = 2n ** getComboOperand(operand);
    regA = numerator / denominator;
    instruction += 2n;
}

function bdv(operand) {
    const numerator = regA;
    const denominator = 2n ** getComboOperand(operand);
    regB = numerator / denominator;
    instruction += 2n;
}

function cdv(operand) {
    const numerator = regA;
    const denominator = 2n ** getComboOperand(operand);
    regC = numerator / denominator;
    instruction += 2n;
}

function bxl(operand) {
    regB = regB ^ BigInt(operand);
    instruction += 2n;
}

function bst(operand) {
    regB = getComboOperand(operand) % 8n;
    instruction += 2n;
}

function jnz(operand) {
    if (regA === 0n) {
        instruction += 2n;
        return;
    }
    instruction = BigInt(operand);
}

function bxc() {
    regB = regB ^ regC;
    instruction += 2n;
}

function out(operand) {
    const operand_value = getComboOperand(operand);
    output.push(operand_value % 8n);
    instruction += 2n;
}

function execute() {
    regA = BigInt(38610541);
    regB = BigInt(0);
    regC = BigInt(0);
    program = [2, 4, 1, 1, 7, 5, 1, 5, 4, 3, 5, 5, 0, 3, 3, 0].map((str) => BigInt(str));

    instruction = 0n;
    output = [];
    while (true) {
        if (instruction >= BigInt(program.length)) break;
        if (instruction + 1n >= BigInt(program.length)) break;

        const opcode = program[Number(instruction)];
        const operand = program[Number(instruction + 1n)];
        switch (BigInt(opcode)) {
            case 0n:
                adv(operand);
                break;
            case 6n:
                bdv(operand);
                break;
            case 7n:
                cdv(operand);
                break;
            case 1n:
                bxl(operand);
                break;
            case 2n:
                bst(operand);
                break;
            case 3n:
                jnz(operand);
                break;
            case 4n:
                bxc();
                break;
            case 5n:
                out(operand);
                break;
            default:
                throw new Error('Error, bad opcode.');
        }
    }
    console.log(output.map((value) => value.toString()).join(','));
}

execute();
