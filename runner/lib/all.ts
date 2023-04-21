import { readdir } from "fs/promises"
import {fileURLToPath} from 'url';
import { Base } from "~/runner/types";
import { getInput } from "./helpers";
import c from 'picocolors'
import { possibilities } from "./greetings";

// I'm not sure how this file will handle more than two AOC parts

const interleave = ([ x, ...xs ], ys = []) =>
  x === undefined
    ? ys                             // base: no x
    : [ x, ...interleave (ys, xs) ]  // inductive: some x

export default async function all(year: number, n: number) {

    const res: { [day: number]: { [part: string]: number[] } } = {}
    const dp = './' + year.toString().substring(2)
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
    }
    const columns = [...new Set(Object.values(res).flatMap(day => Object.keys(day))),'=sum']

    const choice = possibilities[Math.floor(Math.random() * possibilities.length)];
    console.log(`🎄 AOC ${c.bold(c.red(`${choice('year', c.green(year))} ${choice('day', c.green(Object.keys(res)[0]+'..'+Object.keys(res)[Object.keys(res).length-1]))}`))} ${c.gray(`№=${n}`)}`)

    let avges = Object.fromEntries(Object.entries(res).map(([rn,day]) => {
        const davg = Array.from({...Object.values(day).map(part => (part.reduce((a,b) => a+b,0)/n)), length: columns.length-1 })
        const sum = davg.reduce((a,b) => a+(b || 0),0).toFixed(2) + 'ms'
        return [rn,[...davg.map(n => n ? (n.toFixed(2) + 'ms') : undefined,),sum]]
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