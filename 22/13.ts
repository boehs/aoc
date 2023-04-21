import { Challenge, Tests } from "baocr"

const sample = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`

type packet = (number | packet)[]

const run = (one: packet, two: packet) => {
    const larger = Math.max(one.length, two.length)
    for (let n in new Array(larger).fill(0)) {
        const [left, right] = [one[n], two[n]]
        if (typeof left == 'number' && typeof right == 'number') {
            if (left < right) return true
            if (right < left) return false
        }
        if (left == undefined && right != undefined) return true
        if (left != undefined && right == undefined) return false
        if (typeof left == 'object' && typeof right == 'object') {
            const res = run(left, right)
            if (typeof res == 'boolean') return res
        }
        if (typeof left == 'object' && typeof right == 'number') {
            const res = run(left, [right])
            if (typeof res == 'boolean') return res
        }
        if (typeof left == 'number' && typeof right == 'object') {
            const res = run([left], right)
            if (typeof res == 'boolean') return res
        }
    }
}

export const one: Challenge = (input) => input
    .split('\n\n')
    .map(pair =>
        pair.split('\n')
            .map((t) => JSON.parse(t)) as [packet, packet]
    )
    .reduce((a, [one, two], i) => run(one, two) ? a + i + 1 : a, 0)

const twoAddendum = `
[[2]]
[[6]]`

export const two: Challenge = (input) => {
    const res = (input + twoAddendum)
        .split('\n')
        .filter(v => v != '')
        .map((t) => JSON.parse(t) as packet)
        .sort(run)
        .reverse()
    const first = res.findIndex(v => v[0] && v[0][0] == 2)
    const second = res.findIndex(v => v[0] && v[0][0] == 6)
    return (first + 1) * (second + 1)
}

export const tests: Tests = [
    [one, sample, 13],
    [two, sample, 140]
]
