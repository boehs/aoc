# (Bad|Bun|Boehs) AOC Runner ([BAOCR](https://www.npmjs.com/package/baocr))

It's actually mediocre. In your project's root, create a `.env` file with

```bash
# Session Here
AOC_SESSION=
```

## File Usage

For each day, create a file: `YY/DD.ts`

```ts
import { Challenge, Tests } from "baocr/types"

// Your solutions will be tested against this
const sample = ``

// Export a function for part one which takes an input and returns the solution
export const one: Challenge = (input) => ...
// Export a similar function for part two
export const two: Challenge = (input) => ...
// Export tests. First value is the function(s) to check the sample against, the second value is the sample, and the third value is the expected result
export const tests: Tests = [
    [one, sample, ...],
    [two, sample, ...],
    [[one,two], '400', 400]
]
```

Alternatively, simply run `baocr [year] [day]` and the file will be created for you.

## CLI Usage

### Default

You may supply a year and day (`baocr 2022 12`), or omit them to default to the current day (`baocr`)

```
baocr [year] [day]

Run a given AOC

Positionals:
  year                                          [number] [default: CURRENT_YEAR]
  day                                            [number] [default: CURRENT_DAY]

Options:
      --version  Show version number                                   [boolean]
      --help     Show help                                             [boolean]
  -l, --long     marks day as long running. Only test against sample
                                                      [boolean] [default: false]
  -t, --test                                           [boolean] [default: true]
```

It will run each AOC part against the tests, and if all tests pass it will compute the solution. The output for a correct solution looks like:

```
$ baocr 2022 6 
🎄 AOC 0x0000|6 0x0000|2022

one:
   ✅ one(mjqjpqmgbljsphdztnvjfqwrcgsmlb) == 7 0.13ms
   ✅ one(bvwbjplbgvbhsrlpgdmjqwftvncz) == 5 0.01ms
   ✅ one(nppdvjthqldpwncqszvftbrmjlhg) == 6 0.02ms
1093

two:
   ✅ two(mjqjpqmgbljsphdztnvjfqwrcgsmlb) == 19 0.07ms
   ✅ two(bvwbjplbgvbhsrlpgdmjqwftvncz) == 23 0.01ms
   ✅ two(nppdvjthqldpwncqszvftbrmjlhg) == 23 0.01ms
3534

ran in 3.87ms
```

And a failure case looks like:

```
$ baocr 2022 6
🎄 AOC {'day': 6} {'year': 2022}

one:
   ✅ one(mjqjpqmgbljsphdztnvjfqwrcgsmlb) == 7 0.13ms
   ❌ one(bvwbjplbgvbhsrlpgdmjqwftvncz) != 2, == 5 0.01ms
   ⚠️ Stopped

two:
   ✅ two(mjqjpqmgbljsphdztnvjfqwrcgsmlb) == 19 0.06ms
   ✅ two(bvwbjplbgvbhsrlpgdmjqwftvncz) == 23 0.04ms
   ✅ two(nppdvjthqldpwncqszvftbrmjlhg) == 23 0.07ms
3534

ran in 3.04ms
```

In the future, you will be able to run individual parts.

### All

```
baocr all [year]

Run all the AOCs

Positionals:
  year                                          [number] [default: CURRENT_YEAR]

Options:
      --version  Show version number                                   [boolean]
      --help     Show help                                             [boolean]
  -n             Number of runs                           [number] [default: 10]
```

Runs all the AOCs for a given year. Takes the average runtime for the number of chosen runs.

```
$ baocr all 2022 -n 5
🎄 AOC {year=>2022} {days=>1..15} №=5
     one        two       =sum     
   ┌──────────┬─────────┬──────────┐
1  | 0.18ms   | 0.17ms  | 0.35ms   |
   ├──────────┼─────────┼──────────┤
2  | 0.40ms   | 0.47ms  | 0.87ms   |
   ├──────────┼─────────┼──────────┤
8  | 15.51ms  | 13.99ms | 29.50ms  |
   ├──────────┼─────────┼──────────┤
9  | 3.03ms   | 6.17ms  | 9.20ms   |
   ├──────────┼─────────┼──────────┤
10 | 0.08ms   | 0.09ms  | 0.17ms   |
   ├──────────┼─────────┼──────────┤
11 | 0.27ms   | 41.75ms | 42.02ms  |
   ├──────────┼─────────┼──────────┤
12 | 2.80ms   | 2.51ms  | 5.31ms   |
   ├──────────┼─────────┼──────────┤
13 | 0.51ms   | 2.07ms  | 2.58ms   |
   ├──────────┼─────────┼──────────┤
14 | 2.05ms   | 25.59ms | 27.65ms  |
   └──────────┴─────────┴──────────┘
```

## FAQ

### Why not a shared parser?

Typescript support is much more verbose on the user side. ALso see the question below.

### Part two is just a continuation of part one. Can I share the code like I would without a runner?

Maybe. I'm thinking about how to implement this properly.

I considered just a normal file with variable exports, but defining tests without a function is difficult. A single function with mutiple returns sacrifices fine grained benchmark times.

It's possible you will be able to `yield` from a function in a future release, or if you have other designs I'd be happy to listen.