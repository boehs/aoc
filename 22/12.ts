import { Challenge, Tests } from "~/types"
import { cord, direction, directions } from "~/utils/constants"
import { Matrix, direction2cord } from "~/utils/matrix"

const sample = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

const solve = (input: string, part: 1 | 2) => {
    const matr = Matrix.fromStr<string>(input)
    const start = matr.findCord((c) => c == 'S')
    const end = matr.findCord((c) => c == 'E')
    matr[end[1]][end[0]] = 'z'
    matr[start[1]][start[0]] = 'a'
    const heights = matr.iMap((v) => v.charCodeAt(0) - 97)
    const [w,h] = [heights[0].length, heights.length]

    const seen = new Set()
    const queue: [number,cord][] = [[0,end]]

    let res = 0

    while (res == 0) {
        const [l,[x,y]] = queue.shift()
        const p = [x,y].toString()

        if (part == 1 && p == start.toString()) res = l
        if (part == 2 && heights.atCord([x,y]) == 0) res = l

        if (seen.has(p)) continue
        seen.add(p)

        for (const direction of directions) {
            const [nx,ny] = direction2cord(direction,[x,y])
            if (
                0 <= ny && ny < h
                && 0 <= nx && nx < w
                && !seen.has([nx,ny].toString)
                && (heights.atCord([x,y]) - heights.atCord([nx,ny])) <= 1
            ) queue.push([l+1,[nx,ny]])
        }
    }
    return res
}

export const one: Challenge = (input) => solve(input,1)
export const two: Challenge = (input) => solve(input,2)


export const tests: Tests = [
    [one, sample, 31],
    [two, sample, 29]
]


/**
 * This was a good opportunity to learn a little about pathfinding.
 * Initially I just tried bruting, which was fine for the example. I
 * Considered Dijkstra, A*, and adjacency matrixes. Given
 * - We know both the start and end locations of the path we need to search.
 * - We don't need to find the actual path, just its length.
 * - The search space is finite (on a grid) and comparatively small.
 * a breadth-first is fine.
 */