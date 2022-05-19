import run from "aocrunner";
import { EOL } from "os";
import _ from "lodash";
import { exit } from "process";

type Counts = Array<Record<string, number>>;

const parseInput = (rawInput: string) =>
  rawInput.split(EOL).map((row) => row.split(""));

const mostCommonBit = (c: Counts[number]) => (c["0"] > c["1"] ? "0" : "1");
const leastCommonBit = (c: Counts[number]) => (c["0"] <= c["1"] ? "0" : "1");

const getCounts = (data: ReturnType<typeof parseInput>) => {
  const result: Counts = [];

  data.forEach((row) => {
    row.forEach((value, index) => {
      if (!result[index]) {
        result[index] = { 0: 0, 1: 0 };
      }
      result[index][value]++;
    });
  });

  return result;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const counts = getCounts(input);

  const gamma = parseInt(counts.map(mostCommonBit).join(""), 2);
  const epsilon = parseInt(counts.map(leastCommonBit).join(""), 2);

  return gamma * epsilon;
};

const filter = (
  data: ReturnType<typeof parseInput>,
  bitFn: (c: Counts, i: number) => string,
  i: number,
) => {
  // Already found it...
  if (data.length === 1) {
    return data;
  }

  const counts = getCounts(data);

  const bit = bitFn(counts, i);
  return data.filter((row) => row[i] === bit);
};

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput);

  let oxygenInput = input;
  let co2Input = input;
  for (let i = 0; i < input[0].length; i++) {
    oxygenInput = filter(oxygenInput, (c: Counts) => mostCommonBit(c[i]), i);
    co2Input = filter(co2Input, (c: Counts) => leastCommonBit(c[i]), i);

    if (co2Input.length === 1 && oxygenInput.length === 1) {
      return (
        parseInt(co2Input[0].join(""), 2) * parseInt(oxygenInput[0].join(""), 2)
      );
    }
  }

  throw new Error("Unable to find co2Input or oxygenInput");
};

run({
  part1: {
    tests: [
      {
        input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
        expected: 198,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
        expected: 230,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
