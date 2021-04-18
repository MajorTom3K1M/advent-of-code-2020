const fs = require("fs");
const instructions = fs
  .readFileSync("./Day8/input.txt")
  .toString()
  .split("\r\n");

const reader = (instruction) => {
  const { groups } = /(?<cmd>nop|jmp|acc)\s*(?<number>\+{0,1}\-{0,1}\d+)/g.exec(
    instruction
  );
  return { cmd: groups.cmd, number: Number(groups.number) };
};

const compile = (instructions) => {
  let record = [];
  let accumulator = 0;
  for (let i = 0; i < instructions.length; i++) {
    const { cmd, number } = reader(instructions[i]);
    if (record[i]) {
      console.log("Halt! FOUND INFINITE LOOP.");
      return accumulator;
    }
    switch (cmd) {
      case "nop":
        break;
      case "jmp":
        i += number - 1;
        break;
      case "acc":
        accumulator += number;
        break;
      default:
        console.log("ERROR: Unknow instruction command.");
        return;
    }
    record[i] = true;
  }
  return accumulator;
};

console.log(compile(instructions));
