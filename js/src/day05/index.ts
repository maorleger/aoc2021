import run from "aocrunner";
import { EOL } from "os";
import _ from "lodash";
interface Point {
  x: number;
  y: number;
}

interface ParsedEntry {
  start: Point;
  end: Point;
}

const parseInput: (rawInput: string) => ParsedEntry[] = (rawInput: string) =>
  rawInput.split(EOL).map((row) => {
    const [lhs, _, rhs] = row.split(" ");
    const [startX, startY] = lhs.split(",").map((v) => parseInt(v));
    const [endX, endY] = rhs.split(",").map((v) => parseInt(v));
    return {
      start: { x: startX, y: startY },
      end: { x: endX, y: endY },
    };
  });

const countHits = (input: ParsedEntry[], includeDiag: boolean) => {
  const hits: Record<string, number> = {};

  for (const { start, end } of input) {
    // if parallel to x
    if (start.x === end.x) {
      const x = start.x;
      const startY = Math.min(start.y, end.y);
      const endY = Math.max(start.y, end.y);
      for (let y = startY; y <= endY; y++) {
        const key = `${x}|${y}`;
        hits[key] ||= 0;
        hits[key]++;
      }
    }

    // if parallel to y
    else if (start.y === end.y) {
      const y = start.y;
      const startX = Math.min(start.x, end.x);
      const endX = Math.max(start.x, end.x);
      for (let x = startX; x <= endX; x++) {
        const key = `${x}|${y}`;
        hits[key] ||= 0;
        hits[key]++;
      }
    } else if (/* part A ignores diagonals */ includeDiag) {
      // y = mx + b (m -> slope, b -> where line intersects y axis)
      const m = (end.y - start.y) / (end.x - start.x);
      const b = start.y - start.x * m;
      const startX = Math.min(start.x, end.x);
      const endX = Math.max(start.x, end.x);
      for (let x = startX; x <= endX; x++) {
        const y = m * x + b;
        const key = `${x}|${y}`;
        hits[key] ||= 0;
        hits[key]++;
      }
    }
  }

  return Object.values(hits).filter((x) => x > 1).length;
};

const part1 = (rawInput: string) => countHits(parseInput(rawInput), false);

const part2 = (rawInput: string) => countHits(parseInput(rawInput), true);

const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [{ input, expected: 12 }],
    solution: part2,
  },
  trimTestInputs: true,
});
