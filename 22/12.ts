import { Challenge, Tests } from "~/types"
import { cord, direction, directions } from "~/utils/constants"
import { Matrix, direction2cord } from "~/utils/matrix"

const sample = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

function travel(
    matrix: Matrix<number[]>,
    at: cord,
    from: direction,
    visited: string[],
    target: cord,
    i: number,
    possibleSolves: number[]
) {
    const height = matrix.atCord(at)
    directions.forEach(async direction => {

        //if (direction == from) return
        const possibility = direction2cord(direction,at)
        if (possibility[0] < 0 || possibility[1] < 0) return
        if (visited.includes(possibility.join(','))) return
        const possibleHeight = matrix.atCord(possibility)
        if (possibleHeight == undefined) return
        if (possibleHeight > height + 1) return

        //const gFP = new Matrix<(string | number)[]>(...JSON.parse(JSON.stringify(matrix)))
        //visited.forEach(visited => {
        //    const cord = visited.split(',').reverse()
        //    gFP[cord[0]][cord[1]] = 'x'
        //})
        //gFP[at[1]][at[0]] = 'x'
        //gFP[possibility[1]][possibility[0]] = 'X'
        //await new Promise((r) => setTimeout(r,1000))
        //console.log(gFP.toString(' '))
        //console.log('---',i)
        console.log(i)
        if (possibility.toString() == target.toString()) {
            console.log(i+1)
            possibleSolves.push(i+1)
        }

        travel(matrix,possibility,direction,[...visited,at.join(',')],target,i+1,possibleSolves)
    })


    return possibleSolves
}

export const one: Challenge = (input) => {
    const matr = Matrix.fromStr<string>(input)
    const start = matr.findCords((c) => c == 'S')
    const end = matr.findCords((c) => c == 'E')
    matr[end[1]][end[0]] = 'z'
    matr[0][0] = 'a'
    const heights = matr.iMap((v) => v.charCodeAt(0) - 97)
    const possibleSolves = travel(heights,start,'up',[],end,0,[])
    console.log(possibleSolves)
    const smallest = Math.min(...possibleSolves)
    return smallest
}

export const tests: Tests = [
    [one, sample, 31],
]
