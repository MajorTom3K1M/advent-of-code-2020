const fs = require("fs");
const input = fs.readFileSync("./Day4/input.txt").toString().split("\r\n\r\n");

const validate = (key, value) => {
  switch (key) {
    case "byr":
      if (value.length == 4) {
        return Number(value) >= 1920 && Number(value) <= 2002;
      }
      return false;
    case "iyr":
      if (value.length == 4) {
        return Number(value) >= 2010 && Number(value) <= 2020;
      }
      return false;
    case "eyr":
      if (value.length == 4) {
        return Number(value) >= 2020 && Number(value) <= 2030;
      }
      return false;
    case "hgt":
      const unit = value.slice(-2);
      const amount = value.slice(0, -2);
      if (unit === "cm") {
        return Number(amount) >= 150 && Number(amount) <= 193;
      } else if (unit === "in") {
        return Number(amount) >= 59 && Number(amount) <= 76;
      }
      return false;
    case "hcl":
      if (value.match(/^#[0-9a-f]{6}$/g)) {
        return true;
      }
      return false;
    case "ecl":
      if (value.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/g)) {
        return true;
      }
      return false;
    case "pid":
      if (value.match(/^[0-9]{9}$/g)) {
        return true;
      }
      return false;
  }
};

const passportProcessing = (input) => {
  let count = 0;
  for (let data of input) {
    let validFieldCount = 0;
    data.replace(
      /(byr|iyr|eyr|hgt|hcl|ecl|pid):([\S]+)/g,
      function (_, key, value) {
        if (validate(key, value.replace(/(\r|\n|\r\n)/gm, ""))) {
          validFieldCount++;
        }
      }
    );
    if (validFieldCount === 7) {
      count++;
    }
  }
  return count;
};

const validCount = passportProcessing(input);
console.log(validCount);
