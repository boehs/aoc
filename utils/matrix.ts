export const getColumn = (matrix: any[][],column: number) => matrix.map(row => row[column])

export const transpose = (matrix: any[][]) => matrix[0].map((_, index) => matrix.map(row => row[index]).reverse())

export const matrixFromCharGrid = (input: string) => input.split('\n').map(line => line.split(''))
export const matrixFromIGrid = (input: string) => input.split('\n').map(line => line.split('').map(Number))