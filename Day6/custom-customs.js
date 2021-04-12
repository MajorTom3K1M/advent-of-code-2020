const { dir } = require("console");
const fs = require("fs");
const input = fs
  .readFileSync("./Day6/input.txt")
  .toString()
  .split("\r\n\r\n")
  .map((string) => string.replace(/\s/g, ""));

let sum = 0;
for (let answer of input) {
  const groupAnswered = new Array(25);
  for (let i in answer) {
    groupAnswered[answer.charCodeAt(i) - 97] = true;
  }
  sum += groupAnswered.filter(Boolean).length;
}

console.log(sum);
//   console.log(groupAnswered.filter(Boolean).length);
