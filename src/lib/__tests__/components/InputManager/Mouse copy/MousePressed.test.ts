import { InputManager } from '../../../../components/InputManager'

const mockP5 = {
    mousePressed: (event: MouseEvent) => event,
    mouseReleased: (event: MouseEvent) => event,
    keyPressed: (event: KeyboardEvent) => event,
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
    describe('MousePressed', () => {
        describe('Subscribe', () => {
            it('should add a subscriber function to the back of mouse click list by default', () => {
                const inputManager = new InputManager(mockP5)

                const subOne = (event: MouseEvent) => false
                const subTwo = (event: MouseEvent) => false

                inputManager.subscribeToMousePressed(subOne)
                inputManager.subscribeToMousePressed(subTwo)

                expect(inputManager.onMousePressedSubscribers).toEqual([
                    subOne,
                    subTwo,
                ])
            })

            it('should add a subscriber function to the front of mouse click list by when order 1 is provided', () => {
                const inputManager = new InputManager(mockP5)

                const subOne = (event: MouseEvent) => false
                const subTwo = (event: MouseEvent) => false

                inputManager.subscribeToMousePressed(subOne)
                inputManager.subscribeToMousePressed(subTwo, 1)

                expect(inputManager.onMousePressedSubscribers).toEqual([
                    subTwo,
                    subOne,
                ])
            })

            it('should return an unsubscribe function when subscribe is called', () => {
                const inputManager = new InputManager(mockP5)

                const subOne = (event: MouseEvent) => false

                const unsubscribe = inputManager.subscribeToMousePressed(subOne)
                unsubscribe()
                expect(inputManager.onMousePressedSubscribers).toEqual([])
            })
        })

        describe('onMousePressed', () => {
            it('should call all subscribers in the list with the event if they return false', () => {
                const inputManager = new InputManager(mockP5)
                const subOne = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => false)
                const subTwo = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => false)

                inputManager.subscribeToMousePressed(subOne)
                inputManager.subscribeToMousePressed(subTwo)

                const expectedEvent = {
                    preventDefault: () => {},
                }

                inputManager.sketch.mousePressed(expectedEvent)

                expect(subOne).toHaveBeenCalledWith(expectedEvent)
                expect(subTwo).toHaveBeenCalledWith(expectedEvent)
            })

            it('should call stop calling subscribers if one subscriber returns true', () => {
                const inputManager = new InputManager(mockP5)
                const subOne = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => true)
                const subTwo = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => false)

                inputManager.subscribeToMousePressed(subOne)
                inputManager.subscribeToMousePressed(subTwo)

                const expectedEvent = {
                    preventDefault: () => {},
                }

                inputManager.sketch.mousePressed(expectedEvent)

                expect(subOne).toHaveBeenCalledWith(expectedEvent)
                expect(subTwo).not.toHaveBeenCalledWith(expectedEvent)
            })

            it('should not call subscribers if the mouse is outside of the canvas on negative x', () => {
                const inputManager = new InputManager(mockP5)
                const subOne = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => true)
                const subTwo = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => false)

                inputManager.subscribeToMousePressed(subOne)
                inputManager.subscribeToMousePressed(subTwo)

                const expectedEvent = {
                    preventDefault: () => {},
                }

                inputManager.sketch.mouseX = -1
                inputManager.sketch.mouseY = 0
                inputManager.sketch.mousePressed(expectedEvent)

                expect(subOne).not.toHaveBeenCalledWith(expectedEvent)
                expect(subTwo).not.toHaveBeenCalledWith(expectedEvent)
            })

            it('should not call subscribers if the mouse is outside of the canvas on positive x', () => {
                const inputManager = new InputManager(mockP5)
                const subOne = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => true)
                const subTwo = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => false)

                inputManager.subscribeToMousePressed(subOne)
                inputManager.subscribeToMousePressed(subTwo)

                const expectedEvent = {
                    preventDefault: () => {},
                }

                inputManager.sketch.mouseX = 11
                inputManager.sketch.mouseY = 0
                inputManager.sketch.mousePressed(expectedEvent)

                expect(subOne).not.toHaveBeenCalledWith(expectedEvent)
                expect(subTwo).not.toHaveBeenCalledWith(expectedEvent)
            })

            it('should not call subscribers if the mouse is outside of the canvas on negative y', () => {
                const inputManager = new InputManager(mockP5)
                const subOne = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => true)
                const subTwo = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => false)

                inputManager.subscribeToMousePressed(subOne)
                inputManager.subscribeToMousePressed(subTwo)

                const expectedEvent = {
                    preventDefault: () => {},
                }

                inputManager.sketch.mouseX = 0
                inputManager.sketch.mouseY = -1
                inputManager.sketch.mousePressed(expectedEvent)

                expect(subOne).not.toHaveBeenCalledWith(expectedEvent)
                expect(subTwo).not.toHaveBeenCalledWith(expectedEvent)
            })

            it('should not call subscribers if the mouse is outside of the canvas on positive y', () => {
                const inputManager = new InputManager(mockP5)
                const subOne = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => true)
                const subTwo = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => false)

                inputManager.subscribeToMousePressed(subOne)
                inputManager.subscribeToMousePressed(subTwo)

                const expectedEvent = {
                    preventDefault: () => {},
                }

                inputManager.sketch.mouseX = 0
                inputManager.sketch.mouseY = 11
                inputManager.sketch.mousePressed(expectedEvent)

                expect(subOne).not.toHaveBeenCalledWith(expectedEvent)
                expect(subTwo).not.toHaveBeenCalledWith(expectedEvent)
            })
        })
    })
})
