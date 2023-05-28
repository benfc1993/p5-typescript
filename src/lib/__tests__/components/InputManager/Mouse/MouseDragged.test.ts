import { InputManager } from '../../../../components/InputManager'

const mockP5 = {
    mouseDragged: (event: MouseEvent) => event,
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
    describe('MouseDragged', () => {
        describe('Subscribe', () => {
            it('should add a subscriber function to the back of mouse click list by default', () => {
                const inputManager = new InputManager(mockP5)

                const subOne = (event: MouseEvent) => false
                const subTwo = (event: MouseEvent) => false

                inputManager.subscribeToMouseDragged(subOne)
                inputManager.subscribeToMouseDragged(subTwo)

                expect(inputManager.onMouseDraggedSubscribers).toEqual([
                    subOne,
                    subTwo,
                ])
            })

            it('should add a subscriber function to the front of mouse click list by when order 1 is provided', () => {
                const inputManager = new InputManager(mockP5)

                const subOne = (event: MouseEvent) => false
                const subTwo = (event: MouseEvent) => false

                inputManager.subscribeToMouseDragged(subOne)
                inputManager.subscribeToMouseDragged(subTwo, 1)

                expect(inputManager.onMouseDraggedSubscribers).toEqual([
                    subTwo,
                    subOne,
                ])
            })

            it('should return an unsubscribe function when subscribe is called', () => {
                const inputManager = new InputManager(mockP5)

                const subOne = (event: MouseEvent) => false

                const unsubscribe = inputManager.subscribeToMouseDragged(subOne)
                unsubscribe()
                expect(inputManager.onMouseDraggedSubscribers).toEqual([])
            })
        })

        describe('onMouseDragged', () => {
            it('should call all subscribers in the list with the event if they return false', () => {
                const inputManager = new InputManager(mockP5)
                const subOne = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => false)
                const subTwo = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => false)

                inputManager.subscribeToMouseDragged(subOne)
                inputManager.subscribeToMouseDragged(subTwo)

                const expectedEvent = {
                    preventDefault: () => {},
                }

                inputManager.sketch.mouseDragged(expectedEvent)

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

                inputManager.subscribeToMouseDragged(subOne)
                inputManager.subscribeToMouseDragged(subTwo)

                const expectedEvent = {
                    preventDefault: () => {},
                }

                inputManager.sketch.mouseDragged(expectedEvent)

                expect(subOne).toHaveBeenCalledWith(expectedEvent)
                expect(subTwo).not.toHaveBeenCalledWith(expectedEvent)
            })

            it('should not call the subscribers if no event data is provided from p5', () => {
                const inputManager = new InputManager(mockP5)

                const subOne = jest.fn()

                inputManager.subscribeToMouseDragged(subOne)

                inputManager.sketch.mouseDragged()

                expect(subOne).not.toHaveBeenCalledWith()
            })

            it('should not call subscribers if the mouse is outside of the canvas on negative x', () => {
                const inputManager = new InputManager(mockP5)
                const subOne = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => true)
                const subTwo = jest
                    .fn()
                    .mockImplementation((event: MouseEvent) => false)

                inputManager.subscribeToMouseDragged(subOne)
                inputManager.subscribeToMouseDragged(subTwo)

                const expectedEvent = {
                    preventDefault: () => {},
                }

                inputManager.sketch.mouseX = -1
                inputManager.sketch.mouseY = 0
                inputManager.sketch.mouseDragged(expectedEvent)

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

                inputManager.subscribeToMouseDragged(subOne)
                inputManager.subscribeToMouseDragged(subTwo)

                const expectedEvent = {
                    preventDefault: () => {},
                }

                inputManager.sketch.mouseX = 11
                inputManager.sketch.mouseY = 0
                inputManager.sketch.mouseDragged(expectedEvent)

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

                inputManager.subscribeToMouseDragged(subOne)
                inputManager.subscribeToMouseDragged(subTwo)

                const expectedEvent = {
                    preventDefault: () => {},
                }

                inputManager.sketch.mouseX = 0
                inputManager.sketch.mouseY = -1
                inputManager.sketch.mouseDragged(expectedEvent)

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

                inputManager.subscribeToMouseDragged(subOne)
                inputManager.subscribeToMouseDragged(subTwo)

                const expectedEvent = {
                    preventDefault: () => {},
                }

                inputManager.sketch.mouseX = 0
                inputManager.sketch.mouseY = 11
                inputManager.sketch.mouseDragged(expectedEvent)

                expect(subOne).not.toHaveBeenCalledWith(expectedEvent)
                expect(subTwo).not.toHaveBeenCalledWith(expectedEvent)
            })
        })
    })
})
