const fs = require("fs");
const input = fs
  .readFileSync("./Day6/input.txt")
  .toString()
  .split("\r\n\r\n")
  .map((string) => string.split("\r\n"));

let sum = 0;
for (let groupAnswer of input) {
  const groupAnswered = new Array(26);
  groupAnswered.fill(0);
  for (let answer of groupAnswer) {
    for (let i in answer) {
      groupAnswered[answer.charCodeAt(i) - 97]++;
    }
  }
  sum += groupAnswered.filter((value) => value === groupAnswer.length).length;
}

console.log(sum);
