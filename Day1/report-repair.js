const fs = require("fs");
const expenseReport = fs
  .readFileSync("./Day1/input.txt")
  .toString()
  .split("\r\n")
  .map((i) => Number(i));
let target = 2020;

const twoSum = (expenseReport, target) => {
  let dict = {};
  for (let expense of expenseReport) {
    dict[Math.abs(Number(expense) - target)] = expense;
    if (dict.hasOwnProperty(expense)) {
      console.log(Number(expense), " * ", dict[expense]);
      return Number(expense) * dict[expense];
    }
  }
};

console.log(twoSum(expenseReport, target));
