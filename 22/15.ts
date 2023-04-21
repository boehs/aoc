import { Challenge, Tests } from "~/types"
import { cord } from "~/utils/constants"
import { scene } from "~/utils/scene"

const sample = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`

export const one = (input: string, checkY: number = 2000000) => {
    if (checkY == 2000000) return
    const parsed = input
        .split('\n')
        .map(l =>
            l.replaceAll(/[^0-9=]/g, '')
                .split('=')
                .filter(v => !(v == ""))
                .map(Number)
        )

    const scene: scene = {}

    parsed.forEach((group,it) => {
        const [sx, sy, bx, by] = group
        let i = 1, done = false
        while (!done) {
            const queue: cord[] = []
            let x = sx - i, y = sy
            while (y != sy + i + 1) {
                if (y == checkY) {
                    if (!scene[x]) scene[x] = {}
                    scene[x][y] = '#'
                }
                queue.push([x, y])
                if (x == bx && y == by) done = true
                x++
                y++
            }
            x = sx - i, y = sy
            while (y != sy - i - 1) {
                if (y == checkY) {
                    if (!scene[x]) scene[x] = {}
                    scene[x][y] = '#'
                }
                queue.push([x, y])
                if (x == bx && y == by) done = true
                x++
                y--
            }
            queue.forEach(cord => {
                [x, y] = cord
                const to = sx + (sx - x)
                while (true) {
                    if (y == checkY) {
                        if (!scene[x]) scene[x] = {}
                        scene[x][y] = '#'
                    }
                    if (x == bx && y == by) done = true
                    if (x == to) break
                    x++
                }
            })
            i++
        }
    })
    
    const base = Object.entries(scene).filter(column => column[1][checkY] != undefined).length
    const beacons = [...new Set(
        parsed
            .filter(cluster => cluster[3] == checkY)
            .map(cluster => `${cluster[2]},${cluster[3]}`)
    )].length
    return base-beacons

}

export const tests: Tests = [
    [(input) => one(input, 10), sample, 26],
]
