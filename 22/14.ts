import { Challenge, Tests } from "~/types"
import { cord } from "~/utils/constants"
import { Scene } from "~/utils/scene"

const sample = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

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
    const maxY = Math.max(...ys)
    const minY = Math.min(...ys)
    clusters = clusters.map(cluster => cluster.map(([x,y]) => [x-minX+1,y-minY+1]))
    const scene = Scene.blank(maxX-minX+2,maxY-minY+3,' ')
    clusters.forEach((cluster) => {
        cluster.reduce((a,b) => {
            scene.draw(a,b)
            return b
        })
    })
    const dropper = [500-minX+1,0]
    scene[dropper[1]][dropper[0]] = '+'
    console.log(scene.toString())
}

export const tests: Tests = [
    [one, sample, 24],
]
