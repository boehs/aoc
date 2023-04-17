import { cord, direction } from "./constants"

export class Matrix<T extends any[]> extends Array<T> {

    static blank<F>(x: number, y: number, fill: F) {
        const arr = [...Array(x)].map(() => [...Array(y)].fill(fill)) as F[][]
        return new this(...arr)
    }

    static fromStr<T extends any>(input: string, filter: (v: string) => T = (v: string) => v as any) {
        return new this(...input.split('\n').map(line => line.split('').map(filter)))
    }

    atCord(cord: cord) {
        const p1 = this[cord[1]]
        if (p1 == undefined) return undefined
        else return p1[cord[0]]
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

    findCord(predicate: Parameters<Array<T[number]>['findIndex']>[0]) {
        for (let i = 0; i < this.length; i++) {
          const i2 = this[i].findIndex(predicate)
          if (i2 !== -1)
            return [i2,i] as cord
        }
        return undefined
    }

    iMap(...params: Parameters<Array<T[number]>['map']>) {
        return new Matrix(...this.map(row => row.map(...params)))
    }
}

export function direction2cord(direction: direction, current: cord = [0,0], distance: number = 1): cord {
    if (direction == 'down') return [current[0],current[1]-distance]
    if (direction == 'up') return [current[0],current[1]+distance]
    if (direction == 'left') return [current[0]-distance,current[1]]
    if (direction == 'right') return [current[0]+distance,current[1]]
}