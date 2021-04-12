const fs = require("fs");
const groups = fs
  .readFileSync("./Day6/input.txt")
  .toString()
  .split("\r\n\r\n")
  .filter((x) => x);

let total = 0;
let part2 = 0;

for (const group of groups) {
  const uniques = new Set([...group.replace(/\r\n/g, "")]);
  total += uniques.size;

  part2 += [...uniques].filter((char) =>
    group
      .split("\r\n")
      .filter((x) => x)
      .every((from) => from.includes(char))
  ).length;
}

console.log(total);

console.log(part2);
