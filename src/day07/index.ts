import run from "aocrunner";
import { EOL } from "os";
import _ from "lodash";

const parseInput = (rawInput: string) => rawInput.split(",").map(_.toInteger);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const range = _.range(_.min(input)!, _.max(input)!);

  return _(range)
    .map((target) => _.sumBy(input, (start) => Math.abs(target - start)))
    .min();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const range = _.range(_.min(input)!, _.max(input)!);

  const cost = (start: number, end: number) => {
    const distance = Math.abs(end - start);
    return (distance * (distance + 1)) / 2;
  };

  return _(range)
    .map((target) => _.sumBy(input, (start) => cost(start, target)))
    .min();
};

run({
  part1: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 37 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 168 }],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
