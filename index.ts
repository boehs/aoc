import yargs from 'yargs'
import { Base, Challenge,  } from './types'
import { readFile, access, writeFile, copyFile } from 'node:fs/promises'
import c from 'picocolors'

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
    .option('watch', {
        type: 'boolean',
        alias: 'w',
        default: false
    })
    .option('long', {
        type: 'boolean',
        default: false,
        alias: 'l',
        implies: 'watch',
        description: 'marks day as long running. Only test against sample'
    })
    .help()
    .parse(process.argv)

async function fileExists(filename) {
    try {
        await access(filename);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        } else {
            throw err;
        }
    }
}

async function getInput() {
    const path = `./inputs/${args.year}/${args.day}.txt`
    if (await fileExists(path)) {
        return await readFile(path, 'utf-8')
    } else {
        console.log(`⚠️ No Cached AOC!`)
        const inputFetch = await fetch(`https://adventofcode.com/${args.year}/day/${args.day}/input`,{
            headers: {
                cookie: `session=${process.env.AOC_SESSION}`
            }
        })
        if (inputFetch.status == 404) {
            throw new Error('This challenge has not been released yet!')
        }
        const input = await inputFetch.text()
        writeFile(path,input)
        return input
    }
}
const input = await getInput()

function doStuff([func,input,output]: [Challenge,string,any]): [boolean,string] {
    const result = func(input)
    const short = input.split('\n')
    let newInput = short[0]
    if (short.length > 1) newInput = `${short[0]}...${short.length}`
    if (result == output) return [false, `✅ ${func.name}(${newInput}) == ${output}`]
    else return [true, `❌ ${func.name}(${newInput}) != ${output}, == ${result}`]
}

let newTest: {
    [key: string]:  | (() => ReturnType<typeof doStuff> | (() => any))[]
} = {}

if (!args.watch) {
    const path = `./${args.year.toString().substring(2)}/${args.day}.ts`
    if (!await fileExists(path)) await copyFile('./template.ts', path)
    const base: Base = await import(path)
    
    if (base.tests) {
        base.tests.forEach(([func,input,output]) => {
            if (Array.isArray(func)) func.forEach(subFun => {
                if (!newTest[subFun.name]) newTest[subFun.name] = []
                newTest[subFun.name].push(() => doStuff([subFun,input,output]))
        })
            else  {
                if (!newTest[func.name]) newTest[func.name] = []
                newTest[func.name].push(() => doStuff([func,input,output]))
            }
        })
    }
    
    if(!args.long) Object.entries(base).forEach(([k,v]) => {
        if (k == 'tests') return
        if (!newTest[k]) newTest[k] = []
        newTest[k].push(() => v(input.trim()))
    })
}

Promise.all(Object.entries(newTest).map(([k,v]) => {
    let failed = false
    console.log(`${k}:`)
    v.forEach(fn => {
        const tnow = performance.now()
        if (failed) {
            console.log(`   ⚠️ Stopped`)
            return
        }
        const res = fn()
        if (typeof res == 'object') {
            failed = res[0]
            console.log(`   ${res[1]} ${c.gray(performance.now()-tnow)}`)
        } else {
            console.log(res)
        }
    })
}))