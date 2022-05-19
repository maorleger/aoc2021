import run from "aocrunner";
import { EOL } from "os";
import _ from "lodash";

const parseInput = (rawInput: string) =>
  rawInput.split(EOL).map((row) => {
    const [lhs, rhs] = row.split(" | ");
    return {
      signals: lhs.split(" ").map((signal) => signal.split("").sort()),
      outputs: rhs.split(" ").map((signal) => signal.split("").sort()),
    };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let count = 0;
  for (const record of input) {
    count += record.outputs.filter(
      (r) =>
        r.length === 2 || r.length === 4 || r.length === 7 || r.length === 3,
    ).length;
  }

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.reduce((acc, record) => acc + computeOutput(record), 0);
};

function computeOutput(record: ReturnType<typeof parseInput>[number]): number {
  // easy ones
  const one = record.signals.find((s) => s.length === 2)!;
  const four = record.signals.find((s) => s.length === 4)!;
  const seven = record.signals.find((s) => s.length === 3)!;
  const eight = record.signals.find((s) => s.length === 7)!;

  // 3 -> length of 5 & includes 7
  const three = record.signals.find(
    (s) => s.length === 5 && seven.every((d) => s.includes(d)),
  )!;
  // 9 -> length of 6 & includes 4
  const nine = record.signals.find(
    (s) => s.length === 6 && four.every((d) => s.includes(d)),
  )!;
  // 5 -> length of 5, is _included_ in 9, and is not 3
  const five = record.signals.find(
    (s) =>
      s.length === 5 &&
      s.every((d) => nine.includes(d)) &&
      s.some((d) => !three.includes(d)),
  )!;
  // 6 -> length of 6, includes 5, and is not 9
  const six = record.signals.find(
    (s) =>
      s.length === 6 &&
      five.every((d) => s.includes(d)) &&
      s.some((d) => !nine.includes(d)),
  )!;

  // 2 and 0
  // 2 is length of 5, but not 3 or 5
  const two = record.signals.find(
    (s) =>
      s.length === 5 &&
      s.some((d) => !three.includes(d)) &&
      s.some((d) => !five.includes(d)),
  )!;

  // 0 is length of 6, but not 6 or 9
  const zero = record.signals.find(
    (s) =>
      s.length === 6 &&
      s.some((d) => !six.includes(d)) &&
      s.some((d) => !nine.includes(d)),
  )!;

  const decoder = {
    [one.join("")]: "1",
    [two.join("")]: "2",
    [three.join("")]: "3",
    [four.join("")]: "4",
    [five.join("")]: "5",
    [six.join("")]: "6",
    [seven.join("")]: "7",
    [eight.join("")]: "8",
    [nine.join("")]: "9",
    [zero.join("")]: "0",
  };

  return _.toInteger(
    record.outputs.map((output) => decoder[output.join("")]).join(""),
  );
}

const input = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;
run({
  part1: {
    tests: [{ input, expected: 26 }],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input:
          "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
        expected: 9361,
      },
      {
        input,
        expected: 61229,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
