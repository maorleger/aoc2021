import run from "aocrunner";
import { EOL } from "os";
import _ from "lodash";

const parseInput = (rawInput: string) => {
  const [template, rules] = rawInput.split(`${EOL}${EOL}`);
  return {
    template,
    rules: rules.split(EOL).reduce((acc, rule) => {
      const [lhs, _, rhs] = rule.split(" ");
      acc[lhs] = rhs;
      return acc;
    }, {} as Record<string, string>),
  };
};

const part1 = (rawInput: string) => calculateAnswer(parseInput(rawInput), 10);
const part2 = (rawInput: string) => calculateAnswer(parseInput(rawInput), 40);

function calculateAnswer(input: ReturnType<typeof parseInput>, steps: number) {
  let { template, rules } = input;
  let pairCounts: Record<string, number> = {};
  let letterCounts: Record<string, number> = {};

  for (const pair of eachCons(template)) {
    pairCounts[pair] ||= 0;
    pairCounts[pair]++;
  }

  for (const letter of template) {
    letterCounts[letter] ||= 0;
    letterCounts[letter]++;
  }

  _.times(steps, () => {
    pairCounts = applyRules(pairCounts, letterCounts, rules);
  });

  const finalCounts = Object.values(letterCounts);
  return Math.max(...finalCounts) - Math.min(...finalCounts);
}

function applyRules(
  pairCounts: Record<string, number>,
  letterCounts: Record<string, number>,
  rules: Record<string, string>,
) {
  const newPairCounts: typeof pairCounts = {};
  // Naive solution ran out of space of course
  // Had to ask the audience (aka reddit) on this one
  // but the hint was: it's just like lanternfish!
  // Then it was just figuring out the details
  for (const pairKey in pairCounts) {
    if (rules[pairKey]) {
      const [a, b] = pairKey;
      const newChar = rules[pairKey];
      newPairCounts[`${a}${newChar}`] ||= 0;
      newPairCounts[`${a}${newChar}`] += pairCounts[pairKey];
      newPairCounts[`${newChar}${b}`] ||= 0;
      newPairCounts[`${newChar}${b}`] += pairCounts[pairKey];

      letterCounts[rules[pairKey]] ||= 0;
      letterCounts[rules[pairKey]] += pairCounts[pairKey];
    }
  }
  return newPairCounts;
}

function* eachCons(input: string) {
  for (let i = 0; i <= input.length - 2; i++) yield input.slice(i, i + 2);
}

const testInput = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

run({
  part1: {
    tests: [{ input: testInput, expected: 1588 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 2188189693529 }],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
