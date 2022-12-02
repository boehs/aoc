import { Challenge } from "../types"

const sample = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

export const one: Challenge = {
    code(input) {
        return input.split('\n\n')
            .map(item => item
                .split('\n')
                .map(Number)
                .reduce((e, t) => e + t))
            .sort((a, b) => b - a)[0]
    },
    tests: [[sample, 24000]]
}

export const two: Challenge = {
    code(input) {
        return input
            .split('\n\n')
            .map(item => item
                .split('\n')
                .map(Number)
                .reduce((e, t) => e + t))
            .sort((a, b) => b - a)
            .slice(0, 3)
            .reduce((e, t) => e + t)
    },
    tests: [[sample, 45000]]
}

const golfs = [
    {
        code(input) {
            return input.split("\n\n").map(t => t.split("\n").map(t => +t).reduce((t, e) => t + e)).sort((t, e) => e - t)[0]
        },
        test: [[sample, 24000]]
    },
    // Top Three
    {

    },
    // Top 3, golfed
    {
        code(input) {
            return input.split("\n\n").map(e => e.split("\n").map(e => +e).reduce((e, t) => e + t)).sort((e, t) => t - e).slice(0, 3).reduce((e, t) => e + t);
        },
        test: [[sample, 45000]]
    }
]
    