/**
 * @see {@link https://tsplay.dev/aoc2022day7} is much better than mine
 * @name No Space Left On Device
 * @date 7/12/22
 */

import { Challenge, Tests } from "~/types"

const sample = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

interface File {
    children: { [key: string]: File }
    i: number
}

function pathOfObj(path: string[], baseObj: File) {
    let obj = baseObj
    path.forEach(path => {
        if (obj.children[path] == undefined) obj.children[path] = {
            children: {},
            i: 0
        }
        obj = obj.children[path]
    })
    return obj
}

function crawlAndUpdateI(baseObj: File) {
    Object.values(baseObj.children).forEach(child => {
        if (child.children) baseObj.i += crawlAndUpdateI(child)
    })
    return baseObj.i
}

function genTree(input) {
    const flat = input.split('$ ')
        .map(command => command.split('\n'))
        .map(command => [command.splice(0, 1)[0].split(' '), command])
    flat.shift()
    let currentDir: string[] = []
    const obj: File = {
        children: {},
        i: 0
    }
    flat.forEach(([[command, arg], output]) => {
        if (command == 'cd') {
            arg.split('/').forEach(arg => arg == '..' ? currentDir.pop() : currentDir.push(arg))
            currentDir = currentDir.flatMap(entry => entry == '' ? [] : [entry])
        }
        // command is ls
        else {
            const place = pathOfObj(currentDir, obj)
            output.forEach(file => {
                const [size, name] = file.split(' ')
                if (!size) return
                if (size != 'dir') {
                    place.i += Number(size)
                }
            })
        }
    })
    crawlAndUpdateI(obj)
    return obj
}

function crawlAndSumI(baseObj: File) {
    let i = 0;
    i += baseObj.i < 100000 ? baseObj.i : 0
    Object.values(baseObj.children).forEach(child => {
        if (child.children) i += crawlAndSumI(child)
    })
    return i
}

export const one: Challenge = (input) => crawlAndSumI(genTree(input))

function returnFrees(baseObj: File,og = []) {
    og.push(baseObj.i)
    Object.values(baseObj.children).forEach(child => {
        if (child.children) returnFrees(child,og)
    })
    return og
}

const diskspace = 70000000
const target = 30000000
export const two: Challenge = (input) => {
    const fs = genTree(input)
    const usedSpace = fs.i
    const neededFree = -(diskspace-target-usedSpace)
    return returnFrees(fs).reduce((a,b) => b >= neededFree && a > b ? b : a)
}

export const tests: Tests = [
    [one, sample, 95437],
    [two, sample, 24933642]
]