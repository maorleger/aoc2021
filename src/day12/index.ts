import run from "aocrunner";
import { EOL } from "os";
import _ from "lodash";

const parseInput = (rawInput: string) =>
  rawInput.split(EOL).reduce((acc, row) => {
    const [lhs, rhs] = row.split("-");
    acc[lhs] ||= [];
    acc[lhs].push(rhs);
    acc[rhs] ||= [];
    acc[rhs].push(lhs);
    return acc;
  }, {} as Record<string, string[]>);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return dfs("start", input, new Set<string>(), false);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return dfs("start", input, new Set<string>(), true);
};

function dfs(
  node: string,
  graph: ReturnType<typeof parseInput>,
  seen: Set<string>,
  allowMultipleVisits: boolean,
) {
  seen = new Set(seen);
  seen.add(node);

  if (node === "end") {
    return 1;
  }

  let pathCount = 0;
  for (const neighbor of graph[node]) {
    if (neighbor === "start") {
      continue;
    }
    if (seen.has(neighbor)) {
      if (neighbor === "end" || neighbor.toUpperCase() === neighbor) {
        // unlimited visits
        pathCount += dfs(neighbor, graph, seen, allowMultipleVisits);
      } else if (allowMultipleVisits) {
        // Use our one double-visit pass
        pathCount += dfs(neighbor, graph, seen, false);
      }
    } else {
      pathCount += dfs(neighbor, graph, seen, allowMultipleVisits);
    }
  }
  return pathCount;
}

run({
  part1: {
    tests: [],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
  trimTestInputs: true,
});
