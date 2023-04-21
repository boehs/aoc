#!/usr/bin/env bun
import yargs from 'yargs'
import { Base, Challenge } from './types'
import { copyFile } from 'node:fs/promises'
import c from 'picocolors'
import { possibilities } from './runner/greetings'
import { fileExists, getInput } from './runner/helpers'

const now = new Date()

const args = await yargs({})
    .option('year', {
        type: 'number',
        alias: 'y',
        default: now.getFullYear(),
    })
    .option('day', {
        type: 'number',
        alias: 'd',
        default: now.getDate(),
    })
    .option('long', {
        type: 'boolean',
        default: false,
        alias: 'l',
        description: 'marks day as long running. Only test against sample'
    })
    .option('test', {
        type: 'boolean',
        default: true,
        alias: 't',
    })
    .help()
    .parse(process.argv)

const choice = possibilities[Math.floor(Math.random() * possibilities.length)];
console.log(`🎄 AOC ${c.bold(c.red(`${choice('day', c.green(args.day))} ${choice('year', c.green(args.year))}`))}`)

const input = await getInput(args.year, args.day)

function doStuff([func, input, output]: [Challenge, string, any]): [boolean, string] {
    const result = func(input)
    const short = input.split('\n')
    let newInput = short[0]
    if (short.length > 1) newInput = `${short[0]}...${short.length}`
    if (result == output) return [false, `✅ ${c.gray(`${func.name}(${newInput})`)} ${c.green(`== ${output}`)}`]
    else return [true, `❌ ${func.name}(${newInput}) ${c.red(`!= ${output}`)}, ${c.yellow(`== ${result}`)}`]
}

let newTest: {
    [key: string]: | (() => ReturnType<typeof doStuff> | (() => any))[]
} = {}

const path = `./${args.year.toString().substring(2)}/${args.day}.ts`
if (!await fileExists(path)) await copyFile('./template.ts', path)
const base: Base = await import(path)

if (base.tests && args.test) {
    base.tests.forEach(([func, input, output]) => {
        if (Array.isArray(func)) func.forEach(subFun => {
            if (!newTest[subFun.name]) newTest[subFun.name] = []
            newTest[subFun.name].push(() => doStuff([subFun, input, output]))
        })
        else {
            if (!newTest[func.name]) newTest[func.name] = []
            newTest[func.name].push(() => doStuff([func, input, output]))
        }
    })
}

if (!args.long) Object.entries(base).forEach(([k, v]) => {
    if (k == 'tests') return
    if (!newTest[k]) newTest[k] = []
    newTest[k].push(() => v(input.trim()))
})

const startTime = performance.now()
Promise.all(Object.entries(newTest).map(([k, v]) => {
    let failed = false
    console.log(`${k}:`)
    v.forEach(fn => {
        const tnow = performance.now()
        if (failed) {
            console.log(`   ⚠️  Stopped`)
            return
        }
        const res = fn()
        if (typeof res == 'object') {
            failed = res[0]
            console.log(`   ${res[1]} ${c.gray(performance.now() - tnow)}`)
        } else {
            console.log(res)
        }
    })
})).then(() => {
    console.log(`ran in ${c.gray(performance.now() - startTime)}`)
})