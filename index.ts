import yargs from 'yargs'
import { Base, Challenge,  } from './types'
import { readFile, access, writeFile } from 'node:fs/promises'

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
    if (result == output) return [false, `✅ ${func.name}(input) == ${output}`]
    else return [true, `❌ ${func.name}(input) != ${output}`]
}

let newTest: {
    [key: string]:  | (() => ReturnType<typeof doStuff> | (() => any))[]
} = {}

if (!args.watch) {
    const base: Base = await import(`./${args.year.toString().substring(2)}/${args.day}.ts`)
    
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
    
    Object.entries(base).forEach(([k,v]) => {
        if (k == 'tests') return
        if (!newTest[k]) newTest[k] = []
        newTest[k].push(() => v(input))
    })
}

Promise.all(Object.entries(newTest).map(([k,v]) => {
    let failed = false
    console.log(`${k}:`)
    v.forEach(fn => {
        const res = fn()
        if (failed) {
            console.log(`   ⚠️ Stopped`)
            return
        }
        if (typeof res == 'object') {
            failed = res[0]
            console.log(`   ${res[1]}`)
        } else {
            console.log(res)
        }
    })
}))