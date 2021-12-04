import run from "aocrunner";
import { EOL } from "os";
import _ from "lodash";

type Row = [number, number, number, number, number];
interface Board {
  rows: [Row, Row, Row, Row, Row];
  counts: {
    rows: [number, number, number, number, number];
    cols: [number, number, number, number, number];
  };
}

interface Input {
  numbers: number[];
  boards: Board[];
}

const parseInput: (rawInput: string) => Input = (rawInput: string) => {
  const [numbers, ...boards] = rawInput.split(`${EOL}${EOL}`);
  return {
    numbers: numbers.split(",").map(_.toInteger),
    boards: boards.map((board) => {
      const rows = board.split(EOL);
      return {
        rows: rows.map((row) => row.split(/\W+/).map(_.toInteger)),
        counts: { rows: [0, 0, 0, 0, 0], cols: [0, 0, 0, 0, 0] },
      };
    }),
  } as Input;
};

const part1 = (rawInput: string) => {
  const { numbers, boards } = parseInput(rawInput);

  for (const number of numbers) {
    updateBoards(boards, number);

    const winner = boards.find(
      (board) =>
        board.counts.cols.some((col) => col === 5) ||
        board.counts.rows.some((row) => row === 5),
    );

    if (winner) {
      return calculateScore(winner, number);
    }
  }
};

const part2 = (rawInput: string) => {
  let { numbers, boards } = parseInput(rawInput);

  for (const number of numbers) {
    updateBoards(boards, number);

    const remaining = boards.filter(
      (board) =>
        board.counts.cols.every((col) => col < 5) &&
        board.counts.rows.every((row) => row < 5),
    );

    if (remaining.length === 0 && boards.length === 1) {
      // Final winner was identified
      const winner = boards[0];
      return calculateScore(winner, number);
    }

    // Keep the remaining boards for the next round
    boards = remaining;
  }
};

const input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19

3 15  0  2 22
9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
2  0 12  3  7
`;
run({
  part1: {
    tests: [
      {
        input,
        expected: 4512,
      },
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 1924,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
function calculateScore(winner: Board, number: number) {
  let sum = 0;
  winner.rows.forEach((row) => {
    row.forEach((col) => {
      if (col >= 0) {
        // unmarked
        sum += col;
      }
    });
  });
  return sum * number;
}

function updateBoards(boards: Board[], number: number) {
  for (const board of boards) {
    board.rows.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col === number) {
          board.counts.rows[i]++;
          board.counts.cols[j]++;
          board.rows[i][j] *= -1;
        }
      });
    });
  }
}
