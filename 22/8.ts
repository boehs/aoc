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

export const two: Challenge = (input) => {
    const matrix = matrixFromIGrid(input)

    return matrix.map((rows, y) => rows.map((h, x) => {
        const column = getColumn(matrix, x)
        return [
            rows.slice(x + 1),
            rows.slice(0, x).reverse(),
            column.slice(y + 1),
            column.slice(0, y).reverse()
        ].reduce((itemTotal, currentDir) => {
            let i = currentDir.findIndex(p => p >= h)
            return (i < 0 ? currentDir.length : i + 1) * itemTotal
        }, 1)
    })
    ).flat().sort((a, b) => b - a)[0]
}

export const tests: Tests = [
    [one, sample, 21],
    [two, sample, 8]
]
