/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtendedP5 } from '@components/ExtendedP5'

const mockPush = jest.fn()
const mockPop = jest.fn()

jest.mock('p5', (...args: any[]) =>
    jest.fn(...args).mockImplementation((..._args) => ({
        push: mockPush,
        pop: mockPop,
    }))
)

describe('ExtendedP5', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('call p5.push and p5.pop when using section', () => {
        const extendedP5 = new ExtendedP5(() => {})

        const mockFn = jest.fn()
        extendedP5.section(mockFn)

        expect(mockPush).toHaveBeenCalledTimes(1)
        expect(mockFn).toHaveBeenCalledTimes(1)
        expect(mockPop).toHaveBeenCalledTimes(1)
    })
})
