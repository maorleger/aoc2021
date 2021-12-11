import run from "aocrunner";
import { EOL } from "os";
import _ from "lodash";

const parseInput = (rawInput: string) =>
  rawInput.split(EOL).map((row) => row.split("").map(_.toInteger));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return _.range(0, 100).reduce((acc, _) => acc + step(input), 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const numElements = input.length * input[0].length;

  let stepNumber = 1;
  let numFlashes = 0;
  while ((numFlashes = step(input)) !== numElements) {
    stepNumber++;
  }
  return stepNumber;
};

function step(input: ReturnType<typeof parseInput>) {
  let flashes = 0;
  const toFlash: { row: number; col: number }[] = [];
  // phase 1 - initial energy bump
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] === 9) {
        input[i][j] = 0;
        toFlash.push({ row: i, col: j });
      } else {
        input[i][j]++;
      }
    }
  }

  while (toFlash.length > 0) {
    flashes++;
    const next = toFlash.shift()!;
    for (let row = next.row - 1; row <= next.row + 1; row++) {
      for (let col = next.col - 1; col <= next.col + 1; col++) {
        // Same cell
        if (row === next.row && col === next.col) {
          continue;
        }
        // Out of bounds
        if (input[row] === undefined || input[row][col] === undefined) {
          continue;
        }
        // Already flashed
        if (input[row][col] === 0) {
          continue;
        }

        input[row][col]++;
        if (input[row][col] > 9) {
          // Mark it already flashed and queue it to actually flash
          input[row][col] = 0;
          toFlash.push({ row: row, col: col });
        }
      }
    }
  }
  return flashes;
}

const input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

run({
  part1: {
    tests: [{ input, expected: 1656 }],
    solution: part1,
  },
  part2: {
    tests: [{ input, expected: 195 }],
    solution: part2,
  },
  trimTestInputs: true,
});
