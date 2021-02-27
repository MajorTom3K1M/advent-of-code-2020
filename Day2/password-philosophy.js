const fs = require("fs");
const input = fs.readFileSync("./Day2/input.txt").toString().split("\n");

const validatePassword = (input) => {
  let dict = {};
  const [min, max, char, password] = input.replace(/-|\s|: /g, ",").split(",");
  for (let word of password) {
    if (!dict[word]) dict[word] = 0;
    dict[word]++;
  }
  if (dict[char]) {
    if (dict[char] >= Number(min) && dict[char] <= Number(max)) {
      return true;
    }
    return false;
  }
  return false;
};

let count = 0;
for (let value of input) {
  if (validatePassword(value)) {
    count++;
  }
}
console.log(count);
