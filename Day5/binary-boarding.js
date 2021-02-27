const { dir } = require("console");
const fs = require("fs");
const input = fs.readFileSync("./Day5/input.txt").toString().split("\r\n");

const binaryScanSeatID = (direction, MAX_ROW, MAX_COL) => {
  const ROW_NUMBER = MAX_ROW;
  const COL_NUMBER = MAX_COL;

  let row = 0;
  let col = 0;
  let directionVertical = direction.slice(0, -3);
  let directionHorizontal = direction.slice(-3);

  let low = 0;
  let high = ROW_NUMBER;
  let mid = Math.floor((low + high) / 2);
  for (let i = 0; i < directionVertical.length; i++) {
    if (directionVertical[i] === "F") {
      mid = Math.floor((low + high) / 2);
      high = mid;
    } else if (directionVertical[i] === "B") {
      mid = Math.floor((low + high) / 2);
      low = mid + 1;
    }
    row = low;
  }

  low = 0;
  high = COL_NUMBER;
  mid = Math.floor((low + high) / 2);
  for (let i = 0; i < directionHorizontal.length; i++) {
    if (directionHorizontal[i] === "L") {
      mid = Math.floor((low + high) / 2);
      high = mid;
    } else if (directionHorizontal[i] === "R") {
      mid = Math.floor((low + high) / 2);
      low = mid + 1;
    }
    col = low;
  }
  return row * 8 + col;
};

const findMaxSeatId = (list) => {
  let max = Number.MIN_VALUE;
  for (let value in list) {
    if (list[value] === true) {
      if (value > max) {
        max = value;
      }
    }
  }
  return max;
};

let idList = new Array(128 * 8);
idList.fill(false);

for (let direction of input) {
  const seatId = binaryScanSeatID(direction, 127, 7);
  idList[seatId] = true;
}

const maxValue = findMaxSeatId(idList);
console.log("max seatId: ", maxValue);

for (let i = 1; i < 128 * 8; i++) {
  if (!idList[i] && idList[i + 1] && idList[i - 1]) {
    console.log("missing seatId: ", i);
  }
}
