import { Challenge, Tests } from "~/types"
import { cord } from "~/utils/constants"
import { Scene } from "~/utils/scene"

const sample = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

function simulate(cord: cord = [0, 0], scene: Scene<string[]>, queue: Set<string>) {
    const [x, y] = cord
    queue.delete(`${x},${y}`)
    for (let dir of [0, -1, 1]) {
        if (scene[y + 1][x + dir] == ' ') {
            scene[y][x] = ' '
            scene[y + 1][x + dir] = '.'
            queue.add(`${x + dir},${y + 1}`)
            break
        }
    }
}

const run = (input: string, part: number) => {
    // Scene Setup

    let clusters = input
        .split('\n')
        .map(cluster => cluster
            .split(' -> ')
            .map(cord => cord.split(',').map(Number) as cord)
        )
    const xs = clusters.flat(1).map(v => v[0])
    const maxX = Math.max(...xs)
    const minX = Math.min(...xs)
    const ys = clusters.flat(1).map(v => v[1])
    const maxY = Math.max(...ys);
    const minY = Math.min(...ys)

    // pt2 - magic numbers to make it work
    const width = ((maxY - minY) * 2) + 55

    const range = Math.floor((width - (maxX-minX)) / 2)
    
    if (part == 1) clusters = clusters.map(cluster => cluster.map(([x, y]) => [x - minX + 1, y - minY + 4]))
    else clusters = clusters.map(cluster => cluster.map(([x, y]) => {
        return [x - minX + range, y - minY + 4]
    }))

    const scene = Scene.blank<string>(part == 2 ? width : maxX - minX + 2, maxY - minY + 6 + (part == 2 ? 1 : 0), ' ')

    clusters.forEach((cluster) => {
        cluster.reduce((a, b) => {
            scene.draw(a, b)
            return b
        })
    })

    if (part == 2) scene[maxY - minY + 6] = scene[maxY - minY + 6].fill('#')

    // Setup Simulation
    const dropper = [500 - (part == 1 ? minX - 1 : minX - range), 0]
    scene[dropper[1]][dropper[0]] = '+'
    let spawn = `${500 - (part == 1 ? minX - 1 : minX - range)},0`
    let queue = new Set<string>()
    queue.add(spawn)

    // Simulate
    let done = false
    while (!done) {
        queue.add(spawn)
        for (let item of [...queue]) {
            let cords = item.split(',').map(Number) as cord
            if (part == 1 && cords[1] + 1 == maxY - minY + 5) done = true
            
            simulate(cords, scene, queue)
        }
        if (part == 2 && [...queue].length == 0) done = true
    }
    if (part == 2) return scene.flat(2).filter(t => t == '.').length - [...queue].length + 1
    return scene.flat(2).filter(t => t == '.').length - [...queue].length
}

export const one: Challenge = (input) => run(input, 1)
export const two: Challenge = (input) => run(input, 2)

export const tests: Tests = [
    [one, sample, 24],
    [two, sample, 93]
]
