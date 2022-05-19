import run from "aocrunner";
import { EOL } from "os";
import _ from "lodash";

type Direction = "forward" | "down" | "up";
interface Command {
  direction: Direction;
  amount: number;
}
interface Position {
  x: number;
  depth: number;
  aim: number;
}

const parseInput = (rawInput: string) =>
  rawInput.split(EOL).map<Command>((row) => {
    const [direction, amount] = row.split(/\W/);
    return {
      direction: direction as Direction,
      amount: _.toInteger(amount),
    };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const position: Position = {
    x: 0,
    depth: 0,
    aim: 0,
  };

  for (const instruction of input) {
    switch (instruction.direction) {
      case "forward":
        position.x += instruction.amount;
        break;
      case "down":
        position.depth += instruction.amount;
        break;
      case "up":
        position.depth -= instruction.amount;
        break;
    }
  }
  return position.x * position.depth;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const position: Position = {
    x: 0,
    depth: 0,
    aim: 0,
  };

  for (const instruction of input) {
    switch (instruction.direction) {
      case "forward":
        position.x += instruction.amount;
        position.depth += position.aim * instruction.amount;
        break;
      case "down":
        position.aim += instruction.amount;
        break;
      case "up":
        position.aim -= instruction.amount;
        break;
    }
  }
  return position.x * position.depth;
};

const sampleInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

run({
  part1: {
    tests: [
      {
        input: sampleInput,
        expected: 150,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sampleInput,
        expected: 900,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
