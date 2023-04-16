export class Matrix<T extends any[]> extends Array<T> {

    static blank<F>(x: number, y: number, fill: F) {
        const arr = [...Array(x)].map(() => [...Array(y)].fill(fill)) as F[][]
        return new Matrix(arr)
    }

    static fromStr<T extends any>(input: string, filter: (v: string) => T = (v: string) => v as any) {
        return new Matrix(...input.split('\n').map(line => line.split('').map(filter)))
    }

    column(i: number) {
        return this.map(row => row[i])
    }

    rotate(times: number = 1) {
        let rotatedMatrix = [...this]
        const abs = Math.abs(times)
        const sign = Math.sign(times)
        for (let i = 0; i < abs; i++) {
            if (sign == -1) rotatedMatrix = rotatedMatrix.map((_, index) => rotatedMatrix.map(row => row[this.length - 1 - index]))
            else rotatedMatrix = rotatedMatrix[0].map((_, index) => rotatedMatrix.map(row => row[index]).reverse())
          }
          return new Matrix(...rotatedMatrix)
    }

    transpose() {
        return new Matrix(...this[0].map((_, index) => this.map(row => row[index])))
    }

    toString(seperator: string = ''): string {
        const sizes = Array(this[0].length).fill(0)
        return this
            .map(a => a.map((v, i) => {
                const s = v.toString();
                if (sizes[i] < s.length) sizes[i] = s.length;
                return s;
            }))
            .map(a => a.map((s, i) => s.padEnd(sizes[i])).join(seperator))
            .join('\n');
    }
}