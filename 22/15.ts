import { Tests } from "~/types"
import { cord } from "~/utils/constants"

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
    const parsed = input
        .split('\n')
        .map(l =>
            l.replaceAll(/[^-0-9=]/g, '')
                .split('=')
                .filter(v => v != "")
                .map(Number)
        )

    let scene = new Set<number>()

    parsed.forEach(([sx, sy, bx, by]) => {
        /**
         * Manhattan distance is the sum of the absolute values of the horizontal and the vertical distance
         */
        const i = Math.abs(sx - bx) + Math.abs(sy - by)

        let x = sx - i, y = sy, i2 = 0
        while (true) {
            if (y == checkY) {
                const to = sx + (sx - x)
                while (true) {
                    scene.add(x)
                    if (x == to) break
                    x++
                }
                break
            }
            if (i2 == i) break
            x++
            i2++
            if (checkY > y) y++
            else y--
        }
    })

    const beacons = [...new Set(
        parsed
            .filter(cluster => cluster[3] == checkY)
            .map(cluster => `${cluster[2]},${cluster[3]}`)
    )].length
    return [...scene].length - beacons
}

export const tests: Tests = [
    [(input) => one(input, 10), sample, 26],
]