import run from "aocrunner";
import { EOL } from "os";
import _ from "lodash";

const parseInput = (rawInput: string) => rawInput.split(EOL).map(row => {
  const [lhs, rhs] = row.split(" | ")
  return {
    signals: lhs.split(" ").map(signal => signal.split("")),
    outputs: rhs.split(" ").map(signal => signal.split(""))
  }
});

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let count = 0;
  for (const record of input) {
    count += record.outputs.filter(r => r.length === 2 || r.length === 4 || r.length === 7 || r.length === 3).length
  }

  return count
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.reduce((acc, record) => acc + computeOutput(record), 0)

  // first replace known values
  // 1 => 2 
  // 4 => 4
  // 7 => 3
  // 8 => 7

  // dab => 7
  // ab => 1

  // Once I replace them...

  return;
};

const input = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`
run({
  part1: {
    tests: [
      {input, expected: 26}
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`, expected: 61229 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true
});
function computeOutput(record: { signals: string[][]; outputs: string[][]; }): number {
  const segments: { [s: string]: number } = {
    "abcefg": 0,
    "cf": 1,
    "acdeg": 2,
    "acdfg": 3,
    "bcdf": 4,
    "abdfg": 5,
    "abdefg": 6,
    "acf": 7,
    "abcdefg": 8,
    "abcdfg" : 9
  }

  const segmentCounts = new Map<string, number>()

  for (const observation of record.signals) {
    for (const segment of observation) {
      const count = (segmentCounts.get(segment) || 0) + 1
      segmentCounts.set(segment, count);
    }
  }

  const knownSegments = new Map<string, string>()
  console.log(segmentCounts)
  segmentCounts.forEach((count, segment) => {
    if (count === 4) {
      knownSegments.set("e", segment)
    } else if (count === 6) {
      knownSegments.set("b", segment)
    } else if (count === 8) {
      knownSegments.set("a", segment)
    } else if (count === 9) {
      knownSegments.set("f", segment)
    }
  })
  console.log("knownSegments", knownSegments)

  // find c
  // c -> 1 -- f
  const one = record.signals.find(s => s.length === 2)!
  knownSegments.set("c", one!.find(s => s !== knownSegments.get("f"))!)
  console.log("knownSegments", knownSegments)
  // find d
    // find d -> 4 -- b,c,f
  const four = record.signals.find(s => s.length === 4)!
  knownSegments.set("d", _.difference(four, knownSegments.get("b")!, knownSegments.get("c")!, knownSegments.get("f")!)[0])
  console.log("knownSegments", knownSegments)
  // find g
  knownSegments.set("g", _.difference(["a", "b", "c", "d", "e", "f", "g"], [...knownSegments.values()])[0])
  console.log("knownSegments", knownSegments)


  // now let's map these

  // now we can map the output to numbers...

  let sum = 0;
  record.outputs.forEach(output => {
    //[ 'c', 'e', 'f', 'd', 'b' ] 
    // "bcdef" => 
    const realSegments = output.map(v => knownSegments.get(v)!)
    const digit = realSegments.sort().join("")
    console.log(digit, segments[digit])
    console.log(output, realSegments)
  })


  // segment frequencies:
  // a -> 8
  // b -> 6
  // c -> 7
  // d -> 7
  // e -> 4
  // f -> 9
  // g -> 7

  // find a, b, e, f
  // find 1, 4, 7, 8
  // find c -> 1 -- f
  // find d -> 4 -- b,c,f
  // g -> remaining






  // find 1, 4, 7, 8
  // acedgfb(8) cdfbe gcdfa fbcad dab(7) cefabd cdfgeb eafb cagedb ab(1) | cdfeb fcadb cdfeb cdbaf
  // 7 - 1 === a
  // dab - ab === d
  // d === a

  // Find 1, find 7
  // find the top segment
  // Find 4
  // Find 9 -> 


  throw new Error("Function not implemented.");
}

