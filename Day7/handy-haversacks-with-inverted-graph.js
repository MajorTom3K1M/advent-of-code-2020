const fs = require("fs");
const luggages = fs.readFileSync("./Day7/input.txt").toString().split("\r\n");

// * little fast than not inverted index * //
const createInvertedGraph = () => {
  const map = new Map();
  for (const luggage of luggages) {
    const bags = luggage
      .split(/\s*(?:bag)s{0,1}\.{0,1}(?: contain){0,1},{0,1}(?: ){0,1}\s*/g)
      .filter((x) => x && x !== "no other");

    const allBags = bags.map((value) => {
      const { groups } = /(?<amount>\d+)?(?<color>.*)/.exec(value);
      return { color: groups.color.trim(), amount: groups.amount || 1 };
    });
    const inBags = allBags.slice(1);

    for (const bag of inBags) {
      if (!map.get(bag.color)) map.set(bag.color, new Set());
      if (
        allBags.filter((_, i) => i !== 0).some((all) => all.color === bag.color)
      ) {
        const newSet = map
          .get(bag.color)
          .add({ color: allBags[0].color, amount: bag.amount });
        map.set(bag.color, newSet);
      }
    }
  }
  return map;
};

const dfs = (graph, startNode) => {
  const stack = [];
  const visited = [];
  stack.push({ color: startNode, amount: 1 });
  while (stack.length > 0) {
    const visiting = stack.pop();
    if (!visited.includes(visiting.color)) {
      visited.push(visiting.color);
      if (graph.get(visiting.color)) {
        for (const neighbor of graph.get(visiting.color)) {
          stack.push(neighbor);
        }
      }
    }
  }
  return visited;
};

const graph = createInvertedGraph();
const visited = dfs(graph, "shiny gold");
console.log(
  'total amount of bag that can eventually contain at least one "shiny gold" bag : ',
  visited.length - 1
);
