'use strict';

let qubitCount = 0;
let operationLen = 4;

const addQubit = () => {
    qubitCount++;

    const content = document.getElementById('table_template_line').content;

    const fragment = document.createDocumentFragment();

    const clone = document.importNode(content, true);

    const qubit_num = clone.getElementById('qubit_num');
    qubit_num.id = `qubit_${qubitCount}`;
    qubit_num.textContent = qubitCount;

    const result = clone.getElementById('result');
    result.id = `result_${qubitCount}`;

    for (let i = 1; i <= operationLen; ++i) {
        result.parentNode.insertBefore(makeTableValue(`qubit_op_${qubitCount}_${i}`), result);
    }

    fragment.appendChild(clone);

    document.getElementById('table').appendChild(fragment);
}

const makeTableValue = (operationId) => {
    const content = document.getElementById('table_template_value').content;

    const fragment = document.createDocumentFragment();

    const clone = document.importNode(content, true);

    clone.getElementById('operation').id = operationId;

    fragment.appendChild(clone);

    return fragment;
};

for (let i = 1; i <= 3; ++i) {
    addQubit();
}

const parser = math.parser();

document.getElementById('expression_form').addEventListener('submit', (e) => {

    for (let i = 1; i <= qubitCount; ++i) {
        parser.evaluate(`x${i} = Qubit`);
    }

    for (let op = 1; op <= operationLen; ++op) {
        for (let qubit = 1; qubit <= qubitCount; ++qubit) {
            const ch = document.getElementById(`qubit_op_${qubit}_${op}`).value;
            // console.log(ch);
            if (operation1.includes(ch)) {
                parser.evaluate(`x${qubit} = x${qubit} * ${ch}`);
            } else if (ch[0] == 'C' && operation1.includes(ch[1])) {
                parser.evaluate(`x${qubit} = tensor(x${1},x${qubit}) * ${ch}`);
            } else {
                document.getElementById(`qubit_op_${qubit}_${op}`).value = '';
            }
        }
    }

    for (let i = 1; i <= qubitCount; ++i) {
        document.getElementById(`result_${i}`).textContent = math.round(parser.evaluate(`x${i}`), 3).toString();
    }

    return e.preventDefault();
});

const operation1 = ['I', 'X', 'Y', 'Z', 'H'];

parser.evaluate('Qubit = [1,0]');
parser.evaluate('I = [[1,0],[0,1]]');
parser.evaluate('X = [[0,1],[1,0]]');
parser.evaluate('Y = [[0,-i],[i,0]]');
parser.evaluate('Z = [[1,0],[0,-1]]');
parser.evaluate('H = [[1,1],[1,-1]] / sqrt(2)');
parser.evaluate('CX = [[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]]');
parser.evaluate('CY = [[1,0,0,0],[0,1,0,0],[0,0,0,-i],[0,0,i,0]]');
parser.evaluate('CZ = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,-1]]');
parser.evaluate('CH = [[sqrt(2),0,0,0],[0,sqrt(2),0,0],[0,0,1,1],[0,0,1,-1]] / sqrt(2)');
parser.evaluate('tensor(x,y)=[x[1]*y[1],x[1]*y[2],x[2]*y[1],x[2]*y[2]]');
parser.evaluate('get1of2(x)=[x[1],x[3]]');
parser.evaluate('get2of2(x)=[x[2],x[4]]');

for (let i = 1; i <= qubitCount; ++i) {
    parser.evaluate(`x${i} = Qubit`);
}
