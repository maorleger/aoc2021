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

const part1 = (rawInput: string) => {
  let { template, rules } = parseInput(rawInput);

  _.times(10, () => {
    template = applyRules(template, rules);
  });

  const counts = Object.values(_.countBy(template, _.identity));

  return _.max(counts)! - _.min(counts)!;
};

const part2 = (rawInput: string) => {};

function applyRules(template: string, rules: Record<string, string>): string {
  let returnVal: string = "";

  for (let i = 0; i < template.length; i++) {
    returnVal += template[i];
    const ruleKey = `${template.slice(i, i + 2)}`;
    if (rules[ruleKey]) {
      returnVal += rules[ruleKey];
    }
  }
  return returnVal;
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
    // tests: [{ input: testInput, expected: 2188189693529 }],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
