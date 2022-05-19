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

const part1 = (rawInput: string) => calculateAnswer(rawInput, 10);
const part2 = (rawInput: string) => calculateAnswer(rawInput, 40);

function calculateAnswer(rawInput: string, steps: number) {
  const input = parseInput(rawInput);
  let { template, rules } = input;
  let pairCounts = _.countBy(initialPairs(template));
  let letterCounts = _.countBy(template);

  _.times(steps, () => {
    const { newLetterCounts, newPairCounts } = applyRules(
      pairCounts,
      letterCounts,
      rules,
    );
    pairCounts = newPairCounts;
    letterCounts = newLetterCounts;
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
  const newLetterCounts = { ...letterCounts };
  for (const pairKey in pairCounts) {
    if (rules[pairKey]) {
      const [a, b] = pairKey;
      const newChar = rules[pairKey];
      newPairCounts[`${a}${newChar}`] ||= 0;
      newPairCounts[`${a}${newChar}`] += pairCounts[pairKey];
      newPairCounts[`${newChar}${b}`] ||= 0;
      newPairCounts[`${newChar}${b}`] += pairCounts[pairKey];

      newLetterCounts[rules[pairKey]] ||= 0;
      newLetterCounts[rules[pairKey]] += pairCounts[pairKey];
    }
  }
  return { newPairCounts, newLetterCounts };
}

function initialPairs(input: string) {
  const result = [];
  for (let i = 0; i <= input.length - 2; i++) {
    result.push(input.slice(i, i + 2));
  }
  return result;
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
