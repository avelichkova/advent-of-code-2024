const fs = require('fs');

const readFile = fs.readFileSync('./file.txt', {encoding : 'utf-8'});

const splitFile = readFile.split(/\r?\n/);

function isSafeReport(report) {

    function isIncreasingOrDecreasing(levels) {
        let increasing = true, decreasing = true;

        for (let i = 1; i < levels.length; i++) {
            const diff = levels[i] - levels[i - 1];
            if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false; 
            if (diff < 0) increasing = false;      
            if (diff > 0) decreasing = false;     
        }

        return increasing || decreasing;
    }

    if (isIncreasingOrDecreasing(report)) return true;

    for (let i = 0; i < report.length; i++) {
        const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
        if (isIncreasingOrDecreasing(modifiedReport)) return true;
    }

    return false; 
}

function countSafeReports(input) {
    const reports = input.map(line => line.split(' ').map(Number));
    return reports.filter(isSafeReport).length;
}

console.log(countSafeReports(splitFile));
