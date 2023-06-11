import * as Events from '@components/Events'
import { InputManager } from '@components/InputManager'

const mockP5 = {
    mousePressed: (event: MouseEvent) => event,
    mouseReleased: (event: MouseEvent) => event,
    mouseDragged: (event: MouseEvent) => event,
    keyPressed: (event: KeyboardEvent) => event,
    keyReleased: (event: KeyboardEvent) => event,
    keyIsDown: (key: number) => key === 18,
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

const mockRaise = jest.fn()
const mockSubscribe = jest.fn()
const mockUseBlockingOrderedEvent = {
    raise: mockRaise,
    subscribe: mockSubscribe,
}

const mockEvent = { preventDefault: () => {} } as MouseEvent | KeyboardEvent

describe('InputManager', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        jest.spyOn(Events, 'useBlockingOrderedEvent').mockReturnValue(
            mockUseBlockingOrderedEvent
        )
    })

    it('should initialize input events', () => {
        const inputManager = new InputManager(mockP5)

        expect(inputManager.mousePressedEvent).toBe(mockUseBlockingOrderedEvent)

        expect(inputManager.mouseReleasedEvent).toBe(
            mockUseBlockingOrderedEvent
        )

        expect(inputManager.mouseDraggedEvent).toBe(mockUseBlockingOrderedEvent)

        expect(inputManager.keyPressedEvent).toBe(mockUseBlockingOrderedEvent)

        expect(inputManager.keyReleasedEvent).toBe(mockUseBlockingOrderedEvent)
    })

    it('should add a listener for the onMousePressed function', () => {
        const spy = jest.spyOn(InputManager.prototype, 'onMousePressed')
        const inputManager = new InputManager(mockP5)

        inputManager.sketch.mousePressed(mockEvent)

        expect(spy).toHaveBeenCalledWith(mockEvent)
    })

    it('should add a listener for the onMouseReleased function', () => {
        const spy = jest.spyOn(InputManager.prototype, 'onMouseReleased')
        const inputManager = new InputManager(mockP5)

        inputManager.sketch.mouseReleased(mockEvent)

        expect(spy).toHaveBeenCalledWith(mockEvent)
    })

    it('should add a listener for the onMouseDragged function', () => {
        const spy = jest.spyOn(InputManager.prototype, 'onMouseDragged')
        const inputManager = new InputManager(mockP5)

        inputManager.sketch.mouseDragged(mockEvent)

        expect(spy).toHaveBeenCalledWith(mockEvent)
    })

    it('should add a listener for the onKeyPressed function', () => {
        const spy = jest.spyOn(InputManager.prototype, 'onKeyPressed')
        const inputManager = new InputManager(mockP5)

        inputManager.sketch.keyPressed(mockEvent)

        expect(spy).toHaveBeenCalledWith(mockEvent)
    })

    it('should add a listener for the onKeyReleased function', () => {
        const spy = jest.spyOn(InputManager.prototype, 'onKeyReleased')
        const inputManager = new InputManager(mockP5)

        inputManager.sketch.keyReleased(mockEvent)

        expect(spy).toHaveBeenCalledWith(mockEvent)
    })

    describe('mousePressedEvent', () => {
        it('should call the event subscribe method when subscribeToMousePressed is called', () => {
            const inputManager = new InputManager(mockP5)

            const subscribeFn = (event?: MouseEvent) => {
                return false
            }

            inputManager.subscribeToMousePressed(subscribeFn)
            expect(mockSubscribe).toHaveBeenCalledWith(subscribeFn, 1)
        })

        it('should call the event raise method when onMousePressed is called', () => {
            const inputManager = new InputManager(mockP5)

            inputManager.onMousePressed(mockEvent as MouseEvent)

            expect(mockRaise).toHaveBeenCalledWith(mockEvent)
        })

        it('should not call raise if mouseIsOutOfBounds returns true', () => {
            jest.spyOn(
                InputManager.prototype,
                'mouseIsOutOfBounds'
            ).mockReturnValue(true)

            const inputManager = new InputManager(mockP5)

            inputManager.onMousePressed({} as MouseEvent)

            expect(mockRaise).not.toHaveBeenCalledWith(mockEvent)
        })
    })

    describe('mouseReleasedEvent', () => {
        it('should call the event subscribe method when subscribeToMouseReleased is called', () => {
            const inputManager = new InputManager(mockP5)

            const subscribeFn = (event?: MouseEvent) => {
                return false
            }

            inputManager.subscribeToMouseReleased(subscribeFn)
            expect(mockSubscribe).toHaveBeenCalledWith(subscribeFn, 1)
        })

        it('should call the event raise method when onMouseReleased is called', () => {
            const inputManager = new InputManager(mockP5)

            inputManager.onMouseReleased(mockEvent as MouseEvent)

            expect(mockRaise).toHaveBeenCalledWith(mockEvent)
        })

        it('should not call raise if mouseIsOutOfBounds returns true', () => {
            jest.spyOn(
                InputManager.prototype,
                'mouseIsOutOfBounds'
            ).mockReturnValue(true)

            const inputManager = new InputManager(mockP5)

            inputManager.onMouseReleased({} as MouseEvent)

            expect(mockRaise).not.toHaveBeenCalledWith(mockEvent)
        })
    })

    describe('mouseDraggedEvent', () => {
        it('should call the event subscribe method when subscribeToMouseDragged is called', () => {
            const inputManager = new InputManager(mockP5)

            const subscribeFn = (event?: MouseEvent) => {
                return false
            }

            inputManager.subscribeToMouseDragged(subscribeFn)
            expect(mockSubscribe).toHaveBeenCalledWith(subscribeFn, 1)
        })

        it('should call the event raise method when onMouseDragged is called', () => {
            const inputManager = new InputManager(mockP5)

            inputManager.onMouseDragged(mockEvent as DragEvent)

            expect(mockRaise).toHaveBeenCalledWith(mockEvent)
        })

        it('should not call raise if mouseIsOutOfBounds returns true', () => {
            jest.spyOn(
                InputManager.prototype,
                'mouseIsOutOfBounds'
            ).mockReturnValue(true)

            const inputManager = new InputManager(mockP5)

            inputManager.onMouseDragged({} as DragEvent)

            expect(mockRaise).not.toHaveBeenCalledWith(mockEvent)
        })
    })

    describe('keyPressedEvent', () => {
        it('should call the event subscribe method when subscribeToKeyPressed is called', () => {
            const inputManager = new InputManager(mockP5)

            const subscribeFn = (event?: KeyboardEvent) => {
                return false
            }

            inputManager.subscribeToKeyPressed(subscribeFn)
            expect(mockSubscribe).toHaveBeenCalledWith(subscribeFn, 1)
        })

        it('should call the event raise method when onKeyPressed is called', () => {
            const inputManager = new InputManager(mockP5)

            inputManager.onKeyPressed(mockEvent as KeyboardEvent)

            expect(mockRaise).toHaveBeenCalledWith(mockEvent)
        })
    })

    describe('keyReleasedEvent', () => {
        it('should call the event subscribe method when subscribeToKeyReleased is called', () => {
            const inputManager = new InputManager(mockP5)

            const subscribeFn = (event?: KeyboardEvent) => {
                return false
            }

            inputManager.subscribeToKeyReleased(subscribeFn)
            expect(mockSubscribe).toHaveBeenCalledWith(subscribeFn, 1)
        })

        it('should call the event raise method when onKeyReleased is called', () => {
            const inputManager = new InputManager(mockP5)

            inputManager.onKeyReleased(mockEvent as KeyboardEvent)

            expect(mockRaise).toHaveBeenCalledWith(mockEvent)
        })
    })

    describe('scrollEvent', () => {
        it('should call the event subscribe method when subscribeToScroll is called', () => {
            const inputManager = new InputManager(mockP5)

            const subscribeFn = (event?: WheelEvent) => {
                return false
            }

            inputManager.subscribeToScrolled(subscribeFn)
            expect(mockSubscribe).toHaveBeenCalledWith(subscribeFn, 1)
        })

        it('should call the event raise method when onScroll is called', () => {
            const inputManager = new InputManager(mockP5)

            inputManager.onScroll(mockEvent as WheelEvent)

            expect(mockRaise).toHaveBeenCalledWith(mockEvent)
        })
    })

    describe('IsKeyDown', () => {
        it('should return true if the provided key is down', () => {
            const inputManager = new InputManager(mockP5)

            expect(inputManager.isKeyDown('ALT')).toBe(true)
        })
        it('should return false if the provided key is not down', () => {
            const inputManager = new InputManager(mockP5)

            expect(inputManager.isKeyDown('ARROWDOWN')).toBe(false)
        })
    })
})
