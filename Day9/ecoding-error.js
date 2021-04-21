const fs = require("fs");
const encoded = fs.readFileSync("./Day9/test.txt").toString().split("\r\n");

const windowSize = 5;

const findFirstInvalid = (encodedText) => {
  SKIP: for (let i = windowSize; i < encodedText.length; i++) {
    const dict = {};
    const window = encodedText.slice(i - windowSize, i);
    for (const number of window) {
      dict[Math.abs(Number(encodedText[i]) - Number(number))] = Number(number);
      if (dict.hasOwnProperty(number)) continue SKIP;
    }
    return encodedText[i];
  }
};

const answer = findFirstInvalid(encoded);
console.log(answer);