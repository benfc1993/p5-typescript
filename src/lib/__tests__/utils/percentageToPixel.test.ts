import { PercentageToPixel } from '../../utils'

describe('percentageToPixel', () => {
    it('should return the pixel values as provided', () => {
        const { x, y } = PercentageToPixel(
            { width: 100, height: 100 },
            { x: 10, y: 20 }
        )

        expect(x).toEqual(10)
        expect(y).toEqual(20)
    })

    it('should return the pixel values of the percentages provided', () => {
        const { x, y } = PercentageToPixel(
            { width: 100, height: 120 },
            { x: '15%', y: '25%' }
        )

        expect(x).toEqual(15)
        expect(y).toEqual(30)
    })

    it('should return the pixel values of the percentage provided and the pixel value of the pixel provided', () => {
        const { x, y } = PercentageToPixel(
            { width: 100, height: 120 },
            { x: 20, y: '25%' }
        )

        expect(x).toEqual(20)
        expect(y).toEqual(30)
    })

    it('should return the pixel values of the percentage provided plus the pixel addition', () => {
        const { x, y } = PercentageToPixel(
            { width: 100, height: 120 },
            { x: 20, y: '25% + 100' }
        )

        expect(x).toEqual(20)
        expect(y).toEqual(30 + 100)
    })

    it('should return the pixel values of the percentage provided minus the pixel subtraction', () => {
        const { x, y } = PercentageToPixel(
            { width: 100, height: 120 },
            { x: 20, y: '25% + -100' }
        )

        expect(x).toEqual(20)
        expect(y).toEqual(30 - 100)
    })

    it('should return the pixel values of a floating point percentage provided', () => {
        const { x, y } = PercentageToPixel(
            { width: 100, height: 120 },
            { x: 20, y: '25.5%' }
        )

        expect(x).toEqual(20)
        expect(y).toEqual(30.6)
    })

    it('should return the pixel values of the function provided', () => {
        const { x, y } = PercentageToPixel(
            { width: 100, height: 120 },
            { x: () => 2 + 5, y: () => 12 + 3 }
        )

        expect(x).toEqual(7)
        expect(y).toEqual(15)
    })

    it('should accept an object of {w: number, h: number}', () => {
        const { x, y } = PercentageToPixel(
            { width: 100, height: 120 },
            { w: 5, h: 10 }
        )

        expect(x).toEqual(5)
        expect(y).toEqual(10)
    })

    it('should accept an object of {w: string, h: string}', () => {
        const { x, y } = PercentageToPixel(
            { width: 100, height: 120 },
            { w: '5', h: '10' }
        )

        expect(x).toEqual(5)
        expect(y).toEqual(10)
    })

    it('should accept an object of {w: () => number, h: () => number}', () => {
        const { x, y } = PercentageToPixel(
            { width: 100, height: 120 },
            { w: () => 2 + 5, h: () => 12 + 3 }
        )

        expect(x).toEqual(7)
        expect(y).toEqual(15)
    })

    it('should return 0 if the provided string cannot be parsed as a number', () => {
        const { x, y } = PercentageToPixel(
            { width: 100, height: 120 },
            { w: 'abc', h: 10 }
        )

        expect(x).toEqual(0)
        expect(y).toEqual(10)
    })
})
