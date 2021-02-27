const fs = require("fs");
const input = fs
  .readFileSync("./Day3/input.txt")
  .toString()
  .replace(/(\r)/gm, "")
  .split("\n");

const taboganTraversal = (input) => {
  let down = 0;
  let right = 0;
  let count = 0;
  for (let i = 0; i < input.length - 1; i++) {
    right = (right + 3) % input[down].length;
    down = down + 1;
    if (input[down][right] === "#") {
      count++;
    }
  }
  return count;
};

console.log(taboganTraversal(input));
