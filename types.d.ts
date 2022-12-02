export interface Challenge {
    code: (input: string) => any
    tests?: [string, any][]
}