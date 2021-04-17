const fs = require("fs");
const luggages = fs.readFileSync("./Day7/input.txt").toString().split("\r\n");

const createGraph = () => {
  const map = new Map();
  for (const luggage of luggages) {
    const bags = luggage
      .split(/\s*(?:bag)s{0,1}\.{0,1}(?: contain){0,1},{0,1}\s*/g)
      .filter((x) => x && x !== "no other")
      .map((value, index) => {
        if (index !== 0) {
          const split = value.split(/(\d)(?: )/g).filter((x) => x);
          if (split.length > 0) {
            const newObj = { color: split[1], amount: Number(split[0]) };
            return newObj;
          }
        }
        return value;
      });
    map.set(bags[0], bags.slice(1));
  }
  return map;
};

const graph = createGraph();

const dfs_recursive = (graph, startNode, visited = []) => {
  visited.push(startNode.color);
  let sum = 0;
  let value = graph
    .get(startNode.color)
    .reduce((acc, cur) => acc + cur.amount, 0);
  for (const neighbor of graph.get(startNode.color)) {
    sum +=
      neighbor.amount +
      dfs_recursive(graph, neighbor, visited) * neighbor.amount;
  }
  if (sum === 0) return value;
  return sum;
};

console.log(
  "How many individual bags are required inside your single shiny gold bag?",
  dfs_recursive(graph, { amount: 1, color: "shiny gold" }),
  "bags"
);
