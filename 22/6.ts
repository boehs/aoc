import { Challenge, Tests } from "~/types"

const samples = ['mjqjpqmgbljsphdztnvjfqwrcgsmlb','bvwbjplbgvbhsrlpgdmjqwftvncz','nppdvjthqldpwncqszvftbrmjlhg','nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg','zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw']
const solutions = [7,5,6,10,11]

export const one: Challenge = (input) => input.split('').findIndex((_,i,t) => [...new Set(t.slice(i,i+4))].length == 4)+4

export const tests: Tests = [
    ...samples.map((sample,i) => [one,sample,solutions[i]] as [Challenge,string,any])
]