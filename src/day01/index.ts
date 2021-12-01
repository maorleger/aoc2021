import run from "aocrunner";
import { EOL } from "os";
import _ from "lodash";

const parseInput = (rawInput: string) => rawInput.split(EOL).map(_.toInteger);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let lastVal = Number.POSITIVE_INFINITY;
  let count = 0;
  for (const i of input) {
    if (i > lastVal) {
      count++;
    }
    lastVal = i;
  }
  return count;
};

function* eachCons(input: ReturnType<typeof parseInput>) {
  for (let i = 0; i <= input.length - 3; i++) yield input.slice(i, i + 3);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let lastVal = Number.POSITIVE_INFINITY;
  let count = 0;
  for (const slice of eachCons(input)) {
    const sum = _.sum(slice);
    if (sum > lastVal) {
      count++;
    }
    lastVal = sum;
  }
  return count;
};

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
