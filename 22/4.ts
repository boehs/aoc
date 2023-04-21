import { Challenge, Tests } from "~/runner/types"

const sample = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

export const one: Challenge = (input) => input
    .split('\n')
    .reduce((a, b) => {
        const [c, d] = b.split(',')
            .map(g => g
                .split('-')
                .map(Number)
            )
            .map(g => [...Array(g[1] + 1).keys()].slice(g[0]) as number[])
        return a + (c.every(e => d.includes(e)) || d.every(e => c.includes(e)) ? 1 : 0)
    }, 0)

export const two: Challenge = (input) => input
    .split('\n')
    .reduce((a, b) => {
        const [c, d] = b.split(',')
            .map(g => g
                .split('-')
                .map(Number)
            )
            .map(g => [...Array(g[1] + 1).keys()].slice(g[0]) as number[])
        return a + (c.some(e => d.includes(e)) || d.some(e => c.includes(e)) ? 1 : 0)
    }, 0)

export const tests: Tests = [
    [one, sample, 2],
    [two, sample, 4]
]
