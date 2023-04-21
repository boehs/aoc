/**
 * @name Tuning Trouble
 * @date 07/12/22
 * @remarks
 * Trying better comment habits
 * Today was a nice relief after day 5, which was a bit messy with parsing & matrix rotations.
 * Also, multiple tests! Fun to see them all pass in my test runner
 * Only change between easy and hard today was the subsequent unique charecters constant, from 4 to 14.
 */

import { Challenge, Tests } from "~/types"

const samples = ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 'bvwbjplbgvbhsrlpgdmjqwftvncz', 'nppdvjthqldpwncqszvftbrmjlhg', 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw']
const easySolutions = [7, 5, 6, 10, 11]

export const one: Challenge = (input) => input.split('').findIndex((_, i, t) => [...new Set(t.slice(i, i + 4))].length == 4) + 4

const hardSolutions = [19, 23, 23, 29, 26]

export const two: Challenge = (input) => input.split('').findIndex((_, i, t) => [...new Set(t.slice(i, i + 14))].length == 14) + 14

export const tests: Tests = [
    ...samples.map((sample, i) => [easy, sample, easySolutions[i]] as [Challenge, string, any]),
    ...samples.map((sample, i) => [hard, sample, hardSolutions[i]] as [Challenge, string, any])
]