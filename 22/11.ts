import { Challenge, Tests } from "~/types"

const sample = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`

const extractNumber = (input: string) => Number(input.replaceAll(/[^0-9]*/g,''))
const parseMonkey = (monkey: string) => {
    const [idStr, itemsStr, operationStr, testStr, trueStr, falseStr] = monkey.split('\n')
    
    const [id, test, ifTrue, ifFalse] = [idStr,testStr,trueStr,falseStr].map(extractNumber)
    
    const operation = operationStr.replace('Operation: new = ','')
    const operationFn = Function('old', `return ${operation}`)
    
    const items = itemsStr.replace('Starting items: ', '').split(', ').map(Number)
    
    return {
        id,
        items,
        test,
        ifTrue,
        ifFalse,
        operationFn,
        inspected: 0
    }
}
export const one: Challenge = (input) => {
    const monkeys = input.split('\n\n').map(parseMonkey)
    // 20 Rounds
    for (let i = 0; i < 20; i++) {
        monkeys.forEach(monkey => {
            monkey.items.forEach(item => {
                const newWorry = Math.floor(monkey.operationFn(item) / 3)
                monkeys[newWorry % monkey.test == 0
                        ? monkey.ifTrue
                        : monkey.ifFalse].items.push(newWorry)
                monkey.inspected++
            })
            monkey.items = []
        })
    }
    
    return monkeys
        // Sort by most passes
        .sort((a,b) => b.inspected - a.inspected)
        // Get top two
        .slice(0,2)
        // Calculate monkey business!
        .reduce((a,b) => a*b.inspected,1)
}

export const tests: Tests = [
    [one, sample, 10605],
]
