/**
 * @remarks
 * so my initial solution just wasn't working.
 * I have no idea *why*, the renders looked fine,
 * in retrospect I should have diffed it,
 * but regardless this one is much better.
 * 
 * It was pretty slow, ~180ms, little changes brought it down 8x
 * - I changed the while loops to a dead simple "while (true)"
 * - I removed the distributed undef guards and put them in one place (l41)
 * - I changed `delete xx` to setting to undefined (70ms)
 * - I treated air as "undefined" and removed the includes check, which shaved 60ms off 🤯
 * Finally we have a creamy 27ms runtime!
 */

import { Challenge, Tests } from "baocr"
import { cord } from "~/utils/constants"
import { scene } from "~/utils/scene"

const sample = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

const run = (input: string, part: number) => {
    let clusters = input
        .split('\n')
        .map(cluster => cluster
            .split(' -> ')
            .map(cord => cord.split(',').map(Number) as cord)
        )
    const xs = clusters.flat(1).map(v => v[0])
    const ys = clusters.flat(1).map(v => v[1])

    let maxX = Math.max(...xs),
        maxY = Math.max(...ys)

    if (part == 2) {
        maxX = 500 + (maxY + 2)
        maxY += 2;
    }

    const scene: scene = {}

    for (let x = 0; x <= maxX; x++) {
        scene[x] = {}
        if (part == 2) scene[x][maxY] = "#";
    }

    clusters.forEach((cluster) => {
        cluster.reduce((from, to) => {
            const diff = [to[0] - from[0], to[1] - from[1]]
            const idx = diff.findIndex(v => v != 0)
            const n = Math.abs(diff[idx])
            const sign = Math.sign(diff[idx])
            Array.from({ length: n + 1 }, (x, i) => {
                if (idx == 0) return [from[0] + (i * sign), from[1]]
                else return [from[0], from[1] + (i * sign)]
            }).map(([x, y]) => scene[x][y] = '#')
            return to
        })
    })

    let sand = 0
    while (true) {
        let x = 500,
            y = 0
        while (true) {
            scene[x][y] = undefined
            if (scene[x][y + 1] == undefined) y++
            else if (scene[x - 1][y + 1] == undefined) {
                x--
                y++
            } else if (scene[x + 1][y + 1] == undefined) {
                x++
                y++
            } else {
                scene[x][y] = "."
                if (part == 2 && x == 500 && y == 0) return ++sand
                break
            }
            if (part == 1 && y == maxY) return sand
        }
        sand++;
    }
}

export const one: Challenge = (input) => run(input, 1)
export const two: Challenge = (input) => run(input, 2)

export const tests: Tests = [
    [one, sample, 24],
    [two, sample, 93]
]