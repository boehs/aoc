import { Challenge, Tests } from "~/types"

const sample = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

type Dirs = 'L' | 'R' | 'U' | 'D'
type Cord = [number, number]

function mod(dir: Dirs, arr: [number, number]) {
    if (dir == 'L') arr[0]--
    if (dir == 'R') arr[0]++
    if (dir == 'U') arr[1]++
    if (dir == 'D') arr[1]--
}

const isTouching = (head: Cord, tail: Cord) => tail.every((n, i) => Math.abs(head[i] - tail[i]) <= 1)

export const one: Challenge = (input) => {
    const head: Cord = [0, 0]
    let tail: Cord = [0, 0]
    let places = new Set()
    input.split('\n').map(l => {
        const [dir, x] = l.split(' ') as [Dirs, string]
        const _ = [...Array(Number(x))].forEach(() => {
            const prev = [...head]
            mod(dir, head)
            if (!isTouching(head, tail)) tail = prev
            places = places.add(tail.join('.'))
        });
    })
    return [...places].length
}

export const tests: Tests = [
    [one, sample, 13],
]
