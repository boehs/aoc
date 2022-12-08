import { Challenge, Tests } from "~/types"
import { getColumn, matrixFromIGrid } from "~/utils/matrix"

const sample = `30373
25512
65332
33549
35390`

export const one: Challenge = (input) => {
    const matrix = matrixFromIGrid(input)
    let i = 0

    matrix.forEach((row, y) => {
        row.forEach((h, x) => {
            const column = getColumn(matrix, x)
            if ([
                row.slice(x + 1),
                row.slice(0, x),
                column.slice(y + 1),
                column.slice(0, y)
            ].some(res => res.every(i => h > i))) i++
        })
    })

    return i
}

export const tests: Tests = [
    [one, sample, 21]
]
