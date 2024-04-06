import * as Events from '@components/Events'
import { Component } from '@components/Component'
import { Draw } from '@components/SketchLoopEvents'
import { PercentageToPixel } from '@utils/percentageToPixel'

jest.mock('@utils/percentageToPixel')
const mockPercentageToPixel = PercentageToPixel as jest.MockedFunction<
    typeof PercentageToPixel
>

const mockSketchClass = jest.fn().mockImplementation(() => ({
    sketch: 'this is a sketch',
    inputManager: 'this is an input manager',
}))

jest.mock('@components/Sketch', () => mockSketchClass)
class DummyComponent extends Component {}

const subscribers = new Set<() => void>()
const mockUnsubscribe = jest.fn()
const mockSubscribe = jest.fn().mockImplementation((fn: () => void) => {
    subscribers.add(fn)
    return mockUnsubscribe
})
const mockRaise = jest.fn().mockImplementation((_fn: () => void) => {
    subscribers.forEach((fn) => fn())
})

const mockUseEvent = jest.fn().mockImplementation(() => {
    return {
        subscribe: mockSubscribe,
        raise: mockRaise,
    }
})

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
    })

    it('should have an onLoad method', () => {
        expect(Object.keys(Component.prototype)).toEqual(
            expect.arrayContaining(['onLoad'])
        )
    })

    it('should return the calculated pixel position when get pixelPosition is called', () => {
        const component = new DummyComponent(mockSketch)
        const expected = { x: 20, y: 12 }
        mockPercentageToPixel.mockReturnValue(expected)

        expect(component.pixelPosition).toEqual(expected)
    })
})
