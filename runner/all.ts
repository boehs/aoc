import { readdir } from "fs/promises"
import {fileURLToPath} from 'url';
import { Base } from "~/types";
import { getInput } from "./helpers";
const __dirname = fileURLToPath(new URL('.', import.meta.url));
import c from 'picocolors'

const interleave = ([ x, ...xs ], ys = []) =>
  x === undefined
    ? ys                             // base: no x
    : [ x, ...interleave (ys, xs) ]  // inductive: some x

export default async function all(year: number, n: number) {
    const res: { [day: number]: { [part: string]: number[] } } = {}
    const dp = __dirname + '/../' + year.toString().substring(2)
    const dir = await readdir(dp)
    for (let file of dir) {
        const base: Base = await import(dp + '/' + file)
        const day = Number(file.replace('.ts',''))
        const input = await getInput(year, day)
        res[day] = {}
        Object.entries(base).forEach(([k, v]) => {
            if (k == 'tests') return
            res[day][k] = []
            for (let i = 0; n > i; i++) {
                const s = performance.now()
                v(input.trim())
                res[day][k].push(performance.now() - s)
            }
        })
        console.log(file)
    }
    const columns = [...new Set(Object.values(res).flatMap(day => Object.keys(day)))]

    let avges = Object.fromEntries(Object.entries(res).map(([n,day]) => {
        const davg = Array.from({...Object.values(day).map(part => (part.reduce((a,b) => a+b,0)/n).toFixed(2) + 'ms'), length: columns.length})
        return [n,davg]
    }))
    const widest = columns.map((column,i) => Math.max(column.length, ...Object.values(avges).map(day => day[i] ? day[i].length : 0)))

    // day (2) + space (1)
    const header = `   ${columns.map((column,i) => `  ${c.bold(column.padEnd(widest[i]))} `).join('')}`
    const rows = Object.entries(avges).map(([d,time]) =>
        `${c.bold(d.padEnd(2))} ${time.map((time,i) => `${c.gray('|')} ${(time || '').padEnd(widest[i])} `).join('')}${c.gray('|')}`
    )
    const cols = Array.from(Array(rows.length+1),(_,i) => ('   ' + c.gray(
        (i == 0 ? '┌' : i == rows.length ? '└' : '├') +
        widest.map(column => Array(column+2).fill('─').join('')).join(i == 0 ? '┬' : i == rows.length ? '┴' : '┼')  +
        (i == 0 ? '┐' : i == rows.length ? '┘' : '┤'))))
    console.log(header)
    console.log(interleave(cols,rows).join('\n'))
}