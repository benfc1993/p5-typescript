import * as Events from '../../components/Events'
import { Component } from '../../components/Component'
import { Draw } from '../../components/SketchLoopEvents'

const mockSketchClass = jest.fn().mockImplementation(() => ({
    sketch: 'this is a sketch',
    inputManager: 'this is an input manager',
}))

jest.mock('../../components/Sketch', () => mockSketchClass)
class DummyComponent extends Component {}

const subscribers = new Set<() => void>()
const mockSubscribe = jest.fn().mockImplementation((fn: () => void) => {
    subscribers.add(fn)
})
const mockRaise = jest.fn().mockImplementation((fn: () => void) => {
    subscribers.forEach((fn) => fn())
})

const mockUseEvent = jest.fn().mockImplementation(() => ({
    subscribe: mockSubscribe,
    raise: mockRaise,
}))

jest.spyOn(Events, 'useEvent').mockImplementation(mockUseEvent)

describe('Component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    const mockSketch = mockSketchClass()

    describe('initialisation', () => {
        it('should store the provided sketchInstance', () => {
            const component = new DummyComponent(mockSketch)

            expect(component['sketchInstance']).toBe(mockSketch)
        })

        it('should initialise with a get method for the sketch', () => {
            const component = new DummyComponent(mockSketch)

            expect(component.sketch).toEqual('this is a sketch')
        })

        it('should initialise with a get method for the input manager', () => {
            const component = new DummyComponent(mockSketch)

            expect(component.input).toEqual('this is an input manager')
        })
    })

    describe('Events', () => {
        it('should initialise with a subscriber to the Draw event', () => {
            jest.spyOn(DummyComponent.prototype, 'draw')
            const component = new DummyComponent(mockSketch)
            Draw.raise()
            expect(component.draw).toHaveBeenCalled()
        })

        it('should add the unsubscribe from draw to the eventUnsubscriptions list', () => {
            const component = new DummyComponent(mockSketch)
            expect(component.eventUnsubscriptions).toEqual({
                draw: expect.any(Function),
            })
        })
    })

    it('should have an onLoad method', () => {
        expect(Object.keys(Component.prototype)).toEqual(
            expect.arrayContaining(['onLoad'])
        )
    })

    it('should have an onDestroy method', () => {
        expect(Object.keys(Component.prototype)).toEqual(
            expect.arrayContaining(['onDestroy'])
        )
    })
})
