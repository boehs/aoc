export type Challenge = (input: string) => any

export type Test = [Challenge | Challenge[], string, any]

export type Tests = Test[]

export type Base = {
    one: Challenge
    two?: Challenge
    tests?: Tests
}