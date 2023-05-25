import { InputManager } from '../../../../components/InputManager'

const mockP5 = {
    keyReleased: (event: KeyboardEvent) => event,
    mouseX: 0,
    mouseY: 0,
    width: 10,
    height: 10,
} as any as p5

jest.mock('p5', (...args: any[]) =>
    jest.fn(...args).mockImplementation((...args) => ({
        ...mockP5,
        ...(args[1] && { div: args[1] }),
    }))
)

describe('Input Manager', () => {
    describe('KeyReleased', () => {
        describe('Subscribe', () => {
            it('should add a subscriber function to the back of mouse click list by default', () => {
                const inputManager = new InputManager(mockP5)

                const subOne = (event: KeyboardEvent) => false
                const subTwo = (event: KeyboardEvent) => false

                inputManager.subscribeToKeyReleased(subOne)
                inputManager.subscribeToKeyReleased(subTwo)

                expect(inputManager.onKeyReleasedSubscribers).toEqual([
                    subOne,
                    subTwo,
                ])
            })

            it('should add a subscriber function to the front of mouse click list by when order 1 is provided', () => {
                const inputManager = new InputManager(mockP5)

                const subOne = (event: KeyboardEvent) => false
                const subTwo = (event: KeyboardEvent) => false

                inputManager.subscribeToKeyReleased(subOne)
                inputManager.subscribeToKeyReleased(subTwo, 1)

                expect(inputManager.onKeyReleasedSubscribers).toEqual([
                    subTwo,
                    subOne,
                ])
            })

            it('should return an unsubscribe function when subscribe is called', () => {
                const inputManager = new InputManager(mockP5)

                const subOne = (event: KeyboardEvent) => false

                const unsubscribe = inputManager.subscribeToKeyReleased(subOne)
                unsubscribe()
                expect(inputManager.onKeyReleasedSubscribers).toEqual([])
            })
        })

        describe('onKeyReleased', () => {
            it('should call all subscribers in the list with the event if they return false', () => {
                const inputManager = new InputManager(mockP5)
                const subOne = jest
                    .fn()
                    .mockImplementation((event: KeyboardEvent) => false)
                const subTwo = jest
                    .fn()
                    .mockImplementation((event: KeyboardEvent) => false)

                inputManager.subscribeToKeyReleased(subOne)
                inputManager.subscribeToKeyReleased(subTwo)

                const expectedEvent = {
                    preventDefault: () => {},
                }

                inputManager.sketch.keyReleased(expectedEvent)

                expect(subOne).toHaveBeenCalledWith(expectedEvent)
                expect(subTwo).toHaveBeenCalledWith(expectedEvent)
            })

            it('should call stop calling subscribers if one subscriber returns true', () => {
                const inputManager = new InputManager(mockP5)
                const subOne = jest
                    .fn()
                    .mockImplementation((event: KeyboardEvent) => true)
                const subTwo = jest
                    .fn()
                    .mockImplementation((event: KeyboardEvent) => false)

                inputManager.subscribeToKeyReleased(subOne)
                inputManager.subscribeToKeyReleased(subTwo)

                const expectedEvent = {
                    preventDefault: () => {},
                }

                inputManager.sketch.keyReleased(expectedEvent)

                expect(subOne).toHaveBeenCalledWith(expectedEvent)
                expect(subTwo).not.toHaveBeenCalledWith(expectedEvent)
            })

            it('should not call the subscribers if no event data is provided from p5', () => {
                const inputManager = new InputManager(mockP5)

                const subOne = jest.fn()

                inputManager.subscribeToKeyReleased(subOne)

                inputManager.sketch.keyReleased()

                expect(subOne).not.toHaveBeenCalledWith()
            })
        })
    })
})
