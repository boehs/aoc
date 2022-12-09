export const getColumn = (matrix: any[][],column: number) => matrix.map(row => row[column])

export const rotate = (matrix: any[][]) => matrix[0].map((_, index) => matrix.map(row => row[index]).reverse())
export const transpose = (matrix: any[][]) => matrix[0].map((_, index) => matrix.map(row => row[index]))


export const matrixFromCharGrid = (input: string) => input.split('\n').map(line => line.split(''))
export const matrixFromIGrid = (input: string) => input.split('\n').map(line => line.split('').map(Number))

export const createMatrix = (x: number, y: number, fill: string = ' ') => [...Array(x)].map(() => [...Array(y)].fill(fill))
export const toString = (matrix: any[][],seperator: string = '') => {
    const sizes = Array(matrix[0].length).fill(0)
    return matrix
        .map(a => a.map((v, i) => {
            const s = v.toString();
            if (sizes[i] < s.length) sizes[i] = s.length;
            return s;
        }))
        .map(a => a.map((s, i) => s.padEnd(sizes[i])).join(seperator))
        .join('\n');
}