const fs = require("fs");
const encoded = fs.readFileSync("./Day9/input.txt").toString().split("\r\n");

const windowSize = 25;

const findFirstInvalid = (encodedText) => {
  SKIP: for (let i = windowSize; i < encodedText.length; i++) {
    const dict = {};
    const window = encodedText.slice(i - windowSize, i);
    for (const number of window) {
      dict[Math.abs(Number(encodedText[i]) - Number(number))] = Number(number);
      if (dict.hasOwnProperty(number)) continue SKIP;
    }
    return Number(encodedText[i]);
  }
};

const target = findFirstInvalid(encoded);
console.log("part 1", target);

const sumOfTarget = (target, encodedText) => {
  SKIP2: for (const [i, firstNum] of encodedText.entries()) {
    let sum = Number(firstNum);
    for (let j = i + 1; j < encodedText.length; j++) {
      sum += Number(encodedText[j]);
      if (sum === Number(target))
        return encodedText.slice(i, j + 1).map(Number);
      if (sum > target) continue SKIP2;
    }
  }
  return [];
};

const set = sumOfTarget(target, encoded);
console.log("part 2", Math.max(...set) + Math.min(...set));
