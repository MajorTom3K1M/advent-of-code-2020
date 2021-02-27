const fs = require("fs");
const input = fs
  .readFileSync("./Day3/input.txt")
  .toString()
  .replace(/(\r)/gm, "")
  .split("\n");

const taboganTraversal = (input, dStep, rStep) => {
  let down = 0;
  let right = 0;
  let count = 0;
  for (let i = 0; i < input.length - 1; i++) {
    right = (right + rStep) % input[0].length;
    down = down + dStep;
    if (input[down]) {
      if (input[down][right] === "#") {
        count++;
      }
    }
  }
  return count;
};

const slope1 = taboganTraversal(input, 1, 1);
const slope2 = taboganTraversal(input, 1, 3);
const slope3 = taboganTraversal(input, 1, 5);
const slope4 = taboganTraversal(input, 1, 7);
const slope5 = taboganTraversal(input, 2, 1);
console.log(slope1 * slope2 * slope3 * slope4 * slope5);
