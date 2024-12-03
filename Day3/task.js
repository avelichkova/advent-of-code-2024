const fs = require('fs');
const readMemory = fs.readFileSync('./file.txt', {encoding : 'utf-8'});

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const regex2 = /(mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/g;

const multiply = (a, b) => {
    return a * b;
}

const filterMul = function(memory) {
    
    const filterMemory = memory.matchAll(regex);
    let total = 0;
    for(const element of filterMemory) total += multiply(Number(element[1]), Number(element[2]));

    return total;
}

const filterMul2 = function(memory) {
    const filterMemory = memory.matchAll(regex2);
    let total = 0;
    let mulEnable = true;

    for(const element of filterMemory) {
        if(element[0] === 'do()') mulEnable = true;
            else if(element[0] === "don't()") mulEnable = false;
                else if(mulEnable) total += multiply(Number(element[2]), Number(element[3]));
    }

    return total;

}

console.log(filterMul(readMemory));
console.log(filterMul2(readMemory));
