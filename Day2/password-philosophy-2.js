const fs = require("fs");
const input = fs.readFileSync("./Day2/input.txt").toString().split("\n");

const validatePassword = (input) => {
  const [firstChar, seccondChar, char, password] = input
    .replace(/-|\s|: /g, ",")
    .split(",");
  const first = firstChar - 1;
  const seccond = seccondChar - 1;
  if (password[first] !== password[seccond]) {
    if (password[first] === char || password[seccond] === char) {
      return true;
    }
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
