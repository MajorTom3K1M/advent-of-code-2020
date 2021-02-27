const fs = require("fs");
const expenseReport = fs
  .readFileSync("./Day1/input.txt")
  .toString()
  .split("\r\n")
  .map((i) => Number(i));

const threeSum = (expenseReport, target) => {
  let dict = {};
  for (let i in expenseReport) {
    let firtDiff = Math.abs(expenseReport[i] - target);
    for (let j in expenseReport) {
      if (
        j !== i &&
        expenseReport[j] + firtDiff <= target &&
        expenseReport[i] + expenseReport[j] <= target
      ) {
        let diff = Math.abs(expenseReport[j] - firtDiff);
        dict[diff] = [i, j];
        if (
          dict.hasOwnProperty(expenseReport[j]) &&
          dict[expenseReport[j]] &&
          !dict[expenseReport[j]].includes(j)
        ) {
          console.log(
            expenseReport[dict[expenseReport[j]][0]],
            " * ",
            expenseReport[dict[expenseReport[j]][1]],
            " * ",
            expenseReport[j]
          );
          return (
            expenseReport[dict[expenseReport[j]][0]] *
            expenseReport[dict[expenseReport[j]][1]] *
            expenseReport[j]
          );
        }
      }
    }
  }
  return "no matching";
};

console.log(threeSum(expenseReport, 2020));
