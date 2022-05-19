import run from "aocrunner";
import { EOL } from "os";
import _, { update } from "lodash";

type Row = [number, number, number, number, number];

class Board {
  private rows: Row[];
  private counts: {
    rows: Row;
    cols: Row;
  };

  constructor(rows: Row[]) {
    this.rows = rows;
    this.counts = {
      rows: [0, 0, 0, 0, 0],
      cols: [0, 0, 0, 0, 0],
    };
  }

  update(value: number) {
    this.rows.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col === value) {
          this.counts.rows[i]++;
          this.counts.cols[j]++;
          // Avoid storing an extra struct by marking
          // any hits with impossible values (there are no negative numbers)
          this.rows[i][j] *= -1;
        }
      });
    });
  }

  score() {
    // sum all positive (unmarked) values (0 is technically unmarked but doesn't add to sum)
    return _(this.rows)
      .flatMap((row) => {
        return row.filter((col) => col > 0);
      })
      .sum();
  }

  isWinner() {
    return (
      this.counts.cols.some((col) => col === 5) ||
      this.counts.rows.some((row) => row === 5)
    );
  }
}

const parseInput = (rawInput: string) => {
  const [numbers, ...boards] = rawInput.split(`${EOL}${EOL}`);
  return {
    numbers: numbers.split(",").map(_.toInteger),
    boards: boards.map(
      (boardValues) =>
        new Board(
          boardValues
            .split(EOL)
            .map((row) => row.split(/\W+/).map(_.toInteger) as Row),
        ),
    ),
  };
};

const part1 = (rawInput: string) => {
  const { numbers, boards } = parseInput(rawInput);

  for (const number of numbers) {
    boards.forEach((board) => board.update(number));

    const winner = boards.find((board) => board.isWinner());

    if (winner) {
      return winner.score() * number;
    }
  }
};

const part2 = (rawInput: string) => {
  let { numbers, boards } = parseInput(rawInput);

  for (const number of numbers) {
    boards.forEach((board) => board.update(number));

    const remaining = boards.filter((board) => !board.isWinner());

    if (remaining.length === 0 && boards.length === 1) {
      // Final winner was identified
      const winner = boards[0];
      return winner.score() * number;
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
