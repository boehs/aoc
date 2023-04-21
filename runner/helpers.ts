import { access, readFile, writeFile } from "fs/promises";

export async function fileExists(filename) {
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

export async function getInput(year: number, day: number) {
    const path = `./inputs/${year}/${day}.txt`
    if (await fileExists(path)) {
        return await readFile(path, 'utf-8')
    } else {
        console.log(`⚠️ No Cached AOC!`)
        const inputFetch = await fetch(`https://adventofcode.com/${year}/day/${year}/input`,{
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