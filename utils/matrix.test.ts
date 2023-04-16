import { it, test, describe, expect } from "bun:test"
import { Matrix } from "./matrix"

const template = [
    [1, 2, 3],
    [4, 5, 6], 
    [7, 8, 9]
]

describe('matrix operations', () => {
    const matrix = new Matrix(...template)

    test('can access values', () => {
        expect(matrix[0]).toEqual([1,2,3])
        expect(matrix[0][0]).toBe(1)
        expect(matrix[2]).toEqual([7,8,9])
    })

    it('can get columns', () => {
        expect(matrix.column(0)).toEqual([1,4,7])
    })

    it('can be converted into a string', () => {
        expect(matrix.toString(' ')).toBe('1 2 3\n4 5 6\n7 8 9')
    })

    describe('creation', () => {
        it('can be created from a string', () => {
            expect(Matrix.fromStr(`abc\nefg\nhij`)).toEqual([
                ['a','b','c'],
                ['e','f','g'],
                ['h','i','j']
            ])
        }),
        it('can be created from a string of numbers', () => {
            expect(Matrix.fromStr(`123\n456\n789`,Number)).toEqual(template)
        })
    })

    describe('transposion', () => {
        it('can be transposed', () => {
            expect(matrix.transpose()).toEqual([
                [1, 4, 7],
                [2, 5, 8],
                [3, 6, 9]
            ])
        })

        it('can be transposed twice', () => {
            expect(matrix.transpose().transpose()).toEqual(template)
        })
    })


    describe('rotation', () => {
        it('can be rotated', () => {
            expect(matrix.rotate()).toEqual([
                [7,4,1],
                [8,5,2],
                [9,6,3]
            ])
        })

        it('can be rotated twice', () => {
            expect(matrix.rotate(2)).toEqual(matrix.rotate().rotate())
        })

        it('can reverse a rotation', () => {
            expect(matrix.rotate().rotate(-1)).toEqual(template)
        })
    })
})