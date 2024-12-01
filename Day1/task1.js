const fs = require('fs');
const Transform = require('stream').Transform;

let firstList = [];
let secondList = [];

const readF = fs.readFileSync("./file1.txt", 'utf-8');

const splitFile = readF.split(/\r?\n/).forEach(element => {
    const twoEl = element.split("   ");
    firstList.push(twoEl[0]);
    secondList.push(twoEl[1]);
});

function remEt(a, el) {
    for(let i = 0; i < a.length; i++) {
        if(a[i] == el) {
            a.splice(i, 1);
            break;
        }
    }
    return a;
}

const reduce = function(first, second, sum) {
    if(first.length === 0 && second.length === 0) {
        return sum;
    }
    let a = Math.min(...first);
    let b = Math.min(...second);
    sum += (Math.abs(a - b));

    return reduce(remEt(first, a), remEt(second, b), sum);
}

console.log(reduce(firstList, secondList, 0));


