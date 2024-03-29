const fs = require("fs");
const luggages = fs.readFileSync("./Day7/input.txt").toString().split("\r\n");

const createGraph = () => {
  const map = new Map();
  for (const luggage of luggages) {
    const bags = luggage
      .split(/\s*(?:bag)s{0,1}\.{0,1}(?: contain){0,1},{0,1}(?: \d){0,1}\s*/g)
      .filter((x) => x && x !== "no other");
    map.set(bags[0], bags.slice(1));
  }
  return map;
};

const graph = createGraph();

const dfs = (graph, startNode, searchNode) => {
  const stack = [];
  const visited = [];
  stack.push(startNode);
  while (stack.length > 0) {
    const visiting = stack.pop();
    if (visiting === searchNode) {
      return true;
    }
    if (!visited.includes(visiting)) {
      visited.push(visiting);
      for (const neighbor of graph.get(visiting)) {
        stack.push(neighbor);
      }
    }
  }
  return false;
};

let sum = 0;
for (const luggage of graph.keys()) {
  if (dfs(graph, luggage, "shiny gold") && luggage !== "shiny gold") {
    sum = sum + 1;
  }
}

console.log(sum);
