import { Challenge, Tests } from "~/runner/types"
import { alphabet } from '~/utils/constants'

const sample = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

const azArr = (alphabet + alphabet.toUpperCase()).split('')

export const one: Challenge = (input) => {
    return input
        .split('\n')
        .map(pack => [...new Set(pack
            .split('')
            .slice(0, pack.length / 2)
            .filter(item => pack.slice(pack.length / 2).includes(item))
        )])
        .flat()
        .reduce((pre, cur) => pre + azArr.indexOf(cur) + 1, 0)
}

export const two: Challenge = (input) => {
    const splitInput = input.split('\n')
    const groups = []
    for (let i = 0; i < splitInput.length; i += 3)
        groups.push(splitInput.slice(i, i + 3));
    return groups.map((group: string[]) =>
        group.map(arr => arr.split(''))
            .reduce((a, b) => a.filter(c => b.includes(c)))[0]
    )
    .reduce((pre, cur) => pre + azArr.indexOf(cur) + 1, 0)
}

export const tests: Tests = [
    [one, sample, 157],
    [two, sample, 70]
]
