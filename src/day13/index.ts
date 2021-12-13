import run from "aocrunner";
import { EOL } from "os";
import _ from "lodash";

const parseInput = (rawInput: string) => {
  const [locations, instructions] = rawInput.split(`${EOL}${EOL}`);
  const data = {
    locations: locations.split(EOL).map((row) => row.split(",").map(Number)),
    instructions: instructions.split(EOL).map((row) => {
      const [axis, amount] = row.split(" ")[2].split("=");
      return {
        axis,
        line: _.toInteger(amount),
      };
    }),
  };

  let maxCol = _.maxBy(data.locations, (loc) => loc[0])![0];
  let maxRow = _.maxBy(data.locations, (loc) => loc[1])![1];
  const paper: string[][] = [];
  for (let x = 0; x <= maxRow; x++) {
    for (let y = 0; y <= maxCol; y++) {
      paper[x] ||= [];
      paper[x][y] = ".";
    }
  }
  for (const [col, row] of data.locations) {
    paper[row][col] = "#";
  }

  return {
    paper,
    instructions: data.instructions,
  };
};

const part1 = (rawInput: string) => {
  const { paper, instructions } = parseInput(rawInput);
  let { axis, line } = instructions[0];
  if (axis === "x") {
    foldCol(paper, line);
  } else {
    foldRow(paper, line);
  }
  return paper.reduce(
    (acc, row) => acc + row.filter((x) => x === "#").length,
    0,
  );
};

const part2 = (rawInput: string) => {
  const { paper, instructions } = parseInput(rawInput);
  for (const { axis, line } of instructions) {
    if (axis === "x") {
      foldCol(paper, line);
    } else {
      foldRow(paper, line);
    }
  }
  printPaper(paper);
  return "CAFJHZCK"; // submit what I have printed
};

function printPaper(paper: string[][]) {
  for (const row of paper) {
    console.log(row.join(" "));
  }
}

function foldCol(paper: string[][], line: number) {
  fold(paper, (row, col) =>
    col < line ? { row, col } : { row, col: 2 * line - col },
  );
  for (let row = 0; row < paper.length; row++) {
    paper[row].splice(line);
  }
}

function foldRow(paper: string[][], line: number) {
  fold(paper, (row, col) =>
    row < line ? { row, col } : { row: 2 * line - row, col },
  );
  paper.splice(line);
}

function fold(
  paper: string[][],
  newCoordFn: (row: number, col: number) => { row: number; col: number },
) {
  for (let row = 0; row < paper.length; row++) {
    for (let col = 0; col < paper[0].length; col++) {
      const newCoord = newCoordFn(row, col);
      if (paper[row][col] === "#") {
        paper[newCoord.row][newCoord.col] = "#";
      }
    }
  }
}

const testInput = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

run({
  part1: {
    tests: [{ input: testInput, expected: 17 }],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
