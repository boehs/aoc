import { cord } from "./constants";

export class Scene<T extends any[]> extends Array<T> {
    static blank<F>(x: number, y: number, fill = '') {
        const arr = [...Array(y)].map(() => [...Array(x)].fill(fill)) as F[][]
        return new this(...arr)
    }

    draw(from: cord, to: cord, using = '#') {
        const diff = [to[0] - from[0], to[1] - from[1]]
        const idx = diff.findIndex(v => v != 0)
        const n = Math.abs(diff[idx])
        const sign = Math.sign(diff[idx])
        const tod = Array.from({ length: n + 1 }, (x, i) => {
            if (idx == 0) return [from[0] + (i * sign), from[1]]
            else return [from[0], from[1] + (i * sign)]
        })
        tod.map(([x, y]) => {
            this[y][x] = using
        })
        return this
    }

    toString(seperator: string = ''): string {
        return this.map(row => row.join('')).join('\n')
    }
}