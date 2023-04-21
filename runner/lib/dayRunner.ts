import { Base, Challenge } from '~/runner/types'
import { copyFile } from 'node:fs/promises'
import c from 'picocolors'
import { possibilities } from './greetings'
import { fileExists, getInput } from './helpers'
import {fileURLToPath} from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));


export async function day(day: number, year: number, test: boolean, long: boolean) {
    const choice = possibilities[Math.floor(Math.random() * possibilities.length)];
    console.log(`🎄 AOC ${c.bold(c.red(`${choice('day', c.green(day))} ${choice('year', c.green(year))}`))}`)
    const input = await getInput(year, day)
    
    function render([func, input, output]: [Challenge, string, any]): [boolean, string] {
        const result = func(input)
        const short = input.split('\n')
        let newInput = short[0]
        if (short.length > 1) newInput = `${short[0]}...${short.length}`
        if (result == output) return [false, `✅ ${c.gray(`${func.name}(${newInput})`)} ${c.green(`== ${output}`)}`]
        else return [true, `❌ ${func.name}(${newInput}) ${c.red(`!= ${output}`)}, ${c.yellow(`== ${result}`)}`]
    }
    
    let newTest: {
        [key: string]: | (() => ReturnType<typeof render> | (() => any))[]
    } = {}
    
    const path = process.cwd() + `/${year.toString().substring(2)}/${day}.ts`
    if (!await fileExists(path)) await copyFile(__dirname + '../template.ts', path)
    const base: Base = await import(path)
    
    if (base.tests && test) {
        base.tests.forEach(([func, input, output]) => {
            if (Array.isArray(func)) func.forEach(subFun => {
                if (!newTest[subFun.name]) newTest[subFun.name] = []
                newTest[subFun.name].push(() => render([subFun, input, output]))
            })
            else {
                if (!newTest[func.name]) newTest[func.name] = []
                newTest[func.name].push(() => render([func, input, output]))
            }
        })
    }
    
    if (!long) Object.entries(base).forEach(([k, v]) => {
        if (k == 'tests') return
        if (!newTest[k]) newTest[k] = []
        newTest[k].push(() => v(input.trim()))
    })
    
    const startTime = performance.now()
    for (let [k,v] of Object.entries(newTest)) {
        console.log(`\n${c.bold(k)}:`)
        for (let fn of v) {
            const tnow = performance.now()
            const res = fn()
    
            if (typeof res == 'object') console.log(`   ${res[1]} ${c.gray((performance.now() - tnow).toFixed(2) + 'ms')}`)
            else console.log(res)
    
            if (res[0]) {
                console.log(`   ⚠️ Stopped`)
                break
            }
        }
    }
    
    console.log(`\nran in ${c.gray((performance.now() - startTime).toFixed(2) + 'ms')}`)
}