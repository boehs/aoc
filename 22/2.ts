import { Challenge, Tests } from "~/types"

const sample = `A Y
B X
C Z`

enum States {
    Rock = 1,
    Paper = 2,
    Scissors = 3
}

enum Opp {
    A = States.Rock,
    B = States.Paper,
    C = States.Scissors
}

enum My {
    X = States.Rock,
    Y = States.Paper,
    Z = States.Scissors
}

enum Points {
    Win = 6,
    Tie = 3,
    Loss = 0
}

export const one: Challenge = (input) => {
    const games = input.split('\n').map(game => {
        const usThem = game.split(' ')
        return [States[Opp[usThem[0]]],States[My[usThem[1]]]]
    })
    return games.reduce((pre,[opp,my]) => {
        if (my == opp) pre = pre + Points.Tie
        else if (
            (opp == 'Rock' && my == 'Scissors') ||
            (opp == 'Paper' && my == 'Rock') ||
            (opp == 'Scissors' && my == 'Paper')
        ) pre = pre + Points.Loss
        else pre = pre + Points.Win
        pre = pre + States[my]
        return pre
    },0)
}

export const two: Challenge = (input) => undefined

export const tests: Tests = [
    [one, sample, 15],
    [two,sample,12]
]
