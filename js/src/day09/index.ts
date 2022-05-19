import run from "aocrunner";
import { EOL } from "os";
import _ from "lodash";

const parseInput = (rawInput: string) =>
  rawInput.split(EOL).map((row) => row.split("").map(Number));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      const height = input[row][col];
      const neighbors = [
        input[row + 1]?.[col],
        input[row - 1]?.[col],
        input[row][col - 1],
        input[row][col + 1],
      ].filter((h) => h !== undefined); // discard neighbors outside the bounds

      if (neighbors.every((n) => n > height)) {
        sum += 1 + height;
      }
    }
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const sizes = [];
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      if (input[row][col] !== 9) {
        sizes.push(search(input, row, col));
      }
    }
  }

  const largestBasins = _.take(
    sizes.sort((a, b) => b - a),
    3,
  );

  if (largestBasins.length < 3) {
    throw new Error(largestBasins.join(","));
  }

  return largestBasins.reduce((acc, l) => acc * l);
};

function search(
  input: ReturnType<typeof parseInput>,
  row: number,
  col: number,
): number {
  if (
    input[row] === undefined ||
    input[row][col] === undefined ||
    input[row][col] === 9
  ) {
    return 0;
  } else {
    // Mark the cell as not belonging to any basin,
    // since we claim it as part of this basin
    input[row][col] = 9;

    return (
      1 +
      search(input, row + 1, col) +
      search(input, row - 1, col) +
      search(input, row, col + 1) +
      search(input, row, col - 1)
    );
  }
}

const testInput = `2199943210
3987894921
9856789892
8767896789
9899965678`;

run({
  part1: {
    tests: [{ input: testInput, expected: 15 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 1134 }],
    solution: part2,
  },
  trimTestInputs: true,
});
