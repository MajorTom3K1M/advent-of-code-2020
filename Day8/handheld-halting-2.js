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
  let i = 0;
  while (true) {
    if (i === instructions.length) {
      return { accumulator, isFinished: true };
    }
    const { cmd, number } = reader(instructions[i]);
    if (record[i]) {
      console.log("Halt! FOUND INFINITE LOOP.");
      return { accumulator, isFinished: false };
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
    i++;
  }
};

for (let i = 0; i < instructions.length; i++) {
  const cloneInstructions = [...instructions];
  const { cmd, number } = reader(instructions[i]);
  if (cmd === "nop" || cmd === "jmp") {
    cloneInstructions[i] = `${cmd === "nop" ? "jmp" : "nop"} ${
      number >= 0 ? "+" + number : number
    }`;
    const result = compile(cloneInstructions);
    if (result.isFinished) {
      console.log("Program was Fixed.");
      console.log("accumulator is : ", result.accumulator);
      return;
    } else {
      console.log("accumulator is : ", result.accumulator);
    }
  }
}
