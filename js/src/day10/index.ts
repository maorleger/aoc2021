import run from "aocrunner";
import { EOL } from "os";
import _ from "lodash";

const parseInput = (rawInput: string) =>
  rawInput.split(EOL).map((r) => r.split(""));

type ValidationResult =
  | { isValid: true }
  | { isValid: false; invalidChar: string };

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const tokenPoints: Record<string, number> = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };
  return input
    .map((row) => {
      const validationResult = validate(row);
      if (validationResult.isValid) {
        return 0;
      } else {
        return tokenPoints[validationResult.invalidChar];
      }
    })
    .reduce((acc, row) => acc + row);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const totals = input
    .filter((row) => validate(row).isValid)
    .map(completionScore)
    .sort((a, b) => a - b);
  return totals[Math.floor(totals.length / 2)];
};

function validate(row: string[]): ValidationResult {
  let tokenStack = [];
  for (let i = 0; i < row.length; i++) {
    switch (row[i]) {
      case "}":
        if (tokenStack.pop() !== "{") {
          return { isValid: false, invalidChar: "}" };
        }
        break;
      case ")":
        if (tokenStack.pop() !== "(") {
          return { isValid: false, invalidChar: ")" };
        }
        break;
      case "]":
        if (tokenStack.pop() !== "[") {
          return { isValid: false, invalidChar: "]" };
        }
        break;
      case ">":
        if (tokenStack.pop() !== "<") {
          return { isValid: false, invalidChar: ">" };
        }
        break;
      default:
        tokenStack.push(row[i]);
    }
  }
  return { isValid: true };
}

function completionScore(row: string[]) {
  let tokenStack = [];

  for (let i = 0; i < row.length; i++) {
    switch (row[i]) {
      case "}":
      case ")":
      case "]":
      case ">":
        tokenStack.pop();
        break;
      default:
        tokenStack.push(row[i]);
        break;
    }
  }

  // Remaining tokens are incomplete
  let score = 0;
  const tokens: Record<string, number> = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4,
  };
  while (tokenStack.length > 0) {
    const tokenPoints = tokenStack.pop()!;
    score = score * 5 + tokens[tokenPoints]!;
  }
  return score;
}

const testInput = `
  [({(<(())[]>[[{[]{<()<>>
  [(()[<>])]({[<{<<[]>>(
  {([(<{}[<>[]}>{[]{[(<()>
  (((({<>}<{<{<>}{[]{[]{}
  [[<[([]))<([[{}[[()]]]
  [{[{({}]{}}([{[{{{}}([]
  {<[[]]>}<{[{[{[]{()[[[]
  [<(<(<(<{}))><([]([]()
  <{([([[(<>()){}]>(<<{{
  <{([{{}}[<[[[<>{}]]]>[]]`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 26397,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 288957,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
