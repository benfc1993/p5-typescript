import { addFunction } from '../../utils'

describe('addFunction', () => {
    it('should add functionality to a function', () => {
        let myFunc = () => {}

        const additionalFunction = jest.fn()

        myFunc = addFunction(myFunc, additionalFunction)

        myFunc()

        expect(additionalFunction).toHaveBeenCalled()
    })

    it('should add functionality to a function when using the prototype', () => {
        let myFunc = () => {}

        const additionalFunction = jest.fn()

        myFunc = myFunc.addFunction(additionalFunction)

        myFunc()

        expect(additionalFunction).toHaveBeenCalled()
    })

    it('should pass arguments to the additional function', () => {
        let myFunc = () => {}

        const additionalFunction = jest.fn((a: number, b: number) => a + b)

        myFunc = addFunction(myFunc, additionalFunction, 1, 2)

        myFunc()

        expect(additionalFunction).toHaveBeenCalledWith(1, 2)
    })

    it('should pass arguments to the additional function when using the prototype', () => {
        let myFunc = () => {}

        const additionalFunction = jest.fn((a: number, b: number) => a + b)

        myFunc = myFunc.addFunction(additionalFunction, 1, 2)

        myFunc()

        expect(additionalFunction).toHaveBeenCalledWith(1, 2)
    })
})
