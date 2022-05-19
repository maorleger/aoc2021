import run from "aocrunner";
import { EOL } from "os";
import _ from "lodash";

const parseInput = (rawInput: string) => {
  const initialValues = rawInput.split(",").map(_.parseInt);
  const positions = Array(9).fill(0);
  for (const value of initialValues) {
    positions[value]++;
  }
  return positions;
};

const part1 = (rawInput: string) => {
  let timerCounts = parseInput(rawInput);
  _.times(80, () => {
    timerCounts = tick(timerCounts);
  });
  return _.sum(timerCounts);
};

const part2 = (rawInput: string) => {
  let timerCounts = parseInput(rawInput);
  _.times(256, () => {
    timerCounts = tick(timerCounts);
  });
  return _.sum(timerCounts);
};

run({
  part1: {
    tests: [
      {
        input: "3,4,3,1,2",
        expected: 5934,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: "3,4,3,1,2",
        expected: 26984457539,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});

function tick(timerCounts: number[]) {
  const newPositions = [...timerCounts];
  newPositions[0] = timerCounts[1];
  newPositions[1] = timerCounts[2];
  newPositions[2] = timerCounts[3];
  newPositions[3] = timerCounts[4];
  newPositions[4] = timerCounts[5];
  newPositions[5] = timerCounts[6];
  newPositions[6] = timerCounts[7] + timerCounts[0]; // timer changes + newborns
  newPositions[7] = timerCounts[8];
  newPositions[8] = timerCounts[0];
  return newPositions;
}
