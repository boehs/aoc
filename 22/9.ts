import { Challenge, Tests } from "baocr"
import { cord } from "~/utils/constants"

const sample = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

type Dirs = 'L' | 'R' | 'U' | 'D'

function mod(dir: Dirs, arr: [number, number]) {
    if (dir == 'L') arr[0]--
    if (dir == 'R') arr[0]++
    if (dir == 'U') arr[1]++
    if (dir == 'D') arr[1]--
}

const isTouching = (head: cord, tail: cord) => tail.every((_, i) => Math.abs(head[i] - tail[i]) <= 1)

const simulate = (input: string, track: number) => {
    const head: cord = [0, 0]
    const tail: cord[] = Array(track).fill([0, 0])
    const places = new Set<string>()
    input.split('\n').map(l => {
        const [dir, x] = l.split(' ') as [Dirs, string]
        for (let i = 0; i < Number(x); i++) {
            mod(dir, head)
            tail.reduce((former, current, i) => {
                const p = isTouching(former,current) ? current : current.map((n,i) => n + Math.sign(former[i] - n))
                tail[i] = p
                return p
            }, head)
            places.add(tail[track-1].join('.'))
        };
    })
    return [...places].length
}

export const one: Challenge = (input) => simulate(input, 1)

const twosample = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

export const two: Challenge = (input) => simulate(input, 9)

export const tests: Tests = [
    [one, sample, 13],
    [two, sample, 1],
    [two, twosample, 36],
]
