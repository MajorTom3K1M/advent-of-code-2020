const fs = require("fs");
const input = fs.readFileSync("./Day4/input.txt").toString().split("\r\n\r\n");

const passportProcessing = (input) => {
  let count = 0;
  for (let data of input) {
    const regex = data.match(/(byr|iyr|eyr|hgt|hcl|ecl|pid):([\S]+)/g);
    if (regex.length === 7) {
      count++;
    }
  }
  return count;
};

const validCount = passportProcessing(input);
console.log(validCount);
