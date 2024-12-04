const fs = require('fs');

const input = fs.readFileSync('./file.txt', {encoding : "utf-8"});

const splitInput = input.split(/\r?\n/).map(el => el.split(''));
const word1 = 'XMAS';
const word2 = 'MAS';

const numCols = splitInput[0].length;
const numRows = splitInput.length;

const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

const diagonalX = [[-1, 1], [-1, 1]];
const diagonalY = [[1, -1], [-1, 1]];

let sum = 0;

const findWordFromPoint = function(input, x, y, word) {
    let direction = 0;
    if(input[x][y] != word[0]) return;

    while(direction < 8) {
        const currDirX = dx[direction];
        const currDirY = dy[direction];

        let changeX = x + currDirX;
        let changeY = y + currDirY;
        let i;
        for(i = 1; i < word.length; i++) {
            if(changeX < 0 || changeX >= numCols || changeY < 0 || changeY >= numRows) break;
            let currWordSymb = word[i];
            let currInputSymb = input[changeX][changeY];
            if(currWordSymb !== currInputSymb) break;
            changeX += currDirX;
            changeY += currDirY;
        }

        if(i === word.length) sum++

        direction++;
    }
}

let sum2 = 0;

const findXWord = function(input, x, y, word) {
    if(input[x][y] !== word[1]) return;

    const diagonal1 = 0;
    const diagonal2 = 1;

    const isInDiagonal = function(arrX, arrY) {
        const changeX1 = x + arrX[0];
        const changeY1 = y + arrY[0];
        const changeX2 = x + arrX[1];
        const changeY2 = y + arrY[1];

        if(changeX1 < 0 || changeX1 >= numCols || changeY1 < 0 || changeY1 >= numRows) return false;
        if(changeX2 < 0 || changeX2 >= numCols || changeY2 < 0 || changeY2 >= numRows) return false;
        if((input[changeX1][changeY1] === word[0] && input[changeX2][changeY2] === word[2]) || (input[changeX1][changeY1] === word[2] && input[changeX2][changeY2] === word[0])) return true;
        return false;
    }

    if((isInDiagonal(diagonalX[0], diagonalY[0])) && isInDiagonal(diagonalX[1], diagonalY[1])) sum2++;
}

const findNumOfWords = function(input, word) {
    for(let x = 0; x < numRows; x++) {
        for(let y = 0; y < numCols; y++) {
            // findWordFromPoint(input, x, y, word);
            findXWord(input, x, y, word);
        }
    }
}
findNumOfWords(splitInput, word2)
console.log(sum2);