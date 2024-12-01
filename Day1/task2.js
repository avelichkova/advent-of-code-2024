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

let endSum = 0;

firstList.forEach((element) => {
    const numS = secondList.reduce((sum, num) => {
        if(num == element) return sum + 1;
        return sum;
    }, 0);
    endSum += (numS * element);
})

console.log(endSum);