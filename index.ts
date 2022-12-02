import yargs from 'yargs'
import { Challenge } from './types'
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

const runInChain = (name: string, challenge: Challenge) => {
    console.log(`${name}:`)
    let passed = true
    challenge.tests.forEach(test => {
        const result = challenge.code(test[0])
        if (result == test[1]) console.log(`  ✅ ${result} == ${test[1]}`)
        else console.log(`  ❌ ${result} != ${test[1]}`), passed = false
    })
    if (passed) console.log(`
${challenge.code(input)}
`)
}

if (!args.watch) {
    const base: {
        [key: string]: Challenge
    } = await import(`./${args.year.toString().substring(2)}/${args.day}.ts`)
    Promise.all(Object.entries(base).map(challenge => runInChain(challenge[0],challenge[1])))
}