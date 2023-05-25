import { Sketch } from '../components'
import { Component } from '../components/Component'
import { Draw } from '../components/SketchLoopEvents'

jest.mock('../components/Sketch')
const mockSketch = new Sketch(() => {})
class DummyComponent extends Component {}

describe('Component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('should initialise by calling load when passed a sketch class', () => {
        jest.spyOn(DummyComponent.prototype, 'load')
        const component = new DummyComponent(mockSketch)
        expect(component.load).toHaveBeenCalledWith(mockSketch)
    })

    it('should not call load when a sketch class is not provided', () => {
        jest.spyOn(DummyComponent.prototype, 'load')
        const component = new DummyComponent()
        expect(component.load).not.toHaveBeenCalled()
    })

    it('should initialise with a subscriber to the Draw event', () => {
        jest.spyOn(DummyComponent.prototype, 'draw')
        const component = new DummyComponent(mockSketch)
        Draw.raise()
        expect(component.draw).toHaveBeenCalled()
    })

    it('should initialise and call setup when a sketch is provided', () => {
        jest.spyOn(DummyComponent.prototype, 'setup')
        const component = new DummyComponent(mockSketch)
        expect(component.setup).toHaveBeenCalled()
    })
})
