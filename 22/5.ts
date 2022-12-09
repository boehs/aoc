import { Challenge, Tests } from "~/types"
import { rotate } from "~/utils/matrix"

const sample = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

function parse(input: string) {
    const [unparsedCrates, unparsedMoves] = input.split('\n\n').map(g => g.split('\n'))

    // Move x from y to z
    const moves = unparsedMoves.map(move => move
        .replaceAll(new RegExp('(' + ['move', 'from', 'to'].join('|') + ')', 'g'), '')
        .split('  ')
        .map(Number)
    )

    const originalCrates = unparsedCrates.map(l => l
        .split('')
        .filter((_, i) => (i - 1) % 4 === 0))

    // Rotate matrix
    let crates = rotate(originalCrates)
        // Remove empty
        .map(arr => arr.slice(1).flatMap(s => s == ' ' ? [] : s))
    
    return {crates, moves}
}

export const one: Challenge = (input) => {
    const {crates, moves} = parse(input)
    
    // Reverse is important here
    // "Again, because crates are moved one at a time, crate C ends up below crate M"
    // Took embarassingly long to actually read the problem
    moves.forEach(([n, from, to]) => {
        crates[to - 1] = [...crates[to - 1], ...crates[from - 1].splice(-n).reverse()]
    })

    return crates.reduce((a, b) => a + b[b.length - 1], '')
}

export const two: Challenge = (input) => {
    const {crates, moves} = parse(input)

    // Same thing as before, just without that nasty reverse
    moves.forEach(([n, from, to]) => {
        crates[to - 1] = [...crates[to - 1], ...crates[from - 1].splice(-n)]
    })

    return crates.reduce((a, b) => a + b[b.length - 1], '')
}

export const tests: Tests = [
    [one, sample, 'CMZ'],
    [two, sample, 'MCD']
]