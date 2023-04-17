import logUpdate from "log-update"
import { Challenge, Tests } from "~/types"
import { cord } from "~/utils/constants"
import { Scene } from "~/utils/scene"

const sample = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

function simulate(cord: cord = [0,0], scene: Scene<string[]>, queue: Set<string>) {
    const [x,y] = cord
    queue.delete(`${x},${y}`)
    for (let dir of [0,-1,1]) {
        if (scene[y+1][x+dir] == ' ') {
            scene[y][x] = ' '
            scene[y+1][x+dir] = '.'
            queue.add(`${x+dir},${y+1}`)
            break
        } 
    }
}

export const one: Challenge = (input) => {
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
    clusters = clusters.map(cluster => cluster.map(([x,y]) => [x-minX+1,y-minY+4]))
    const scene = Scene.blank<string>(maxX-minX+2,maxY-minY+6,' ')
    clusters.forEach((cluster) => {
        cluster.reduce((a,b) => {
            scene.draw(a,b)
            return b
        })
    })
    const dropper = [500-minX+1,0]
    scene[dropper[1]][dropper[0]] = '+'
    let spawn = `${500-minX+1},1`
    let queue = new Set<string>()
    queue.add(spawn)
    let i = 0
    let done = false
    while(!done) {
        if (i % 2 == 0) queue.add(spawn)
        for (let item of [...queue]) {
            let cords = item.split(',').map(Number) as cord
            if (cords[1]+1 == maxY-minY+5) done = true
            simulate(cords, scene, queue)
        }
        i++
    }
    return scene.flat(2).filter(t => t=='.').length-[...queue].length
}

export const tests: Tests = [
    [one, sample, 24],
]
