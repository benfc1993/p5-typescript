import p5 from 'p5'
import { Sketch } from '../../components/Sketch'
import { InputManager } from '../../components/InputManager'
import { PercentageToPixel } from '../../utils/percentageToPixel'
import { Component } from '../../components/Component'
import { Draw } from '../../components/SketchLoopEvents'

const mockResizeCanvas = jest.fn()
const mockBackground = jest.fn()
const mockCreateCanvas = jest.fn()

const mockP5 = {
    windowResized: () => {},
    createCanvas: mockCreateCanvas,
    background: mockBackground,
    resizeCanvas: mockResizeCanvas,
    windowWidth: 100,
    windowHeight: 200,
}

jest.mock('p5', (...args: any[]) =>
    jest.fn(...args).mockImplementation((...args) => ({
        ...mockP5,
        ...(args[1] && { div: args[1] }),
    }))
)

jest.mock('../../components/InputManager')
jest.mock('../../components/Component')
jest.mock('../../components/SketchLoopEvents')

jest.mock('../../utils/percentageToPixel')
const mockPercentageToPixel = PercentageToPixel as jest.MockedFunction<
    typeof PercentageToPixel
>
mockPercentageToPixel.mockImplementation((scalar: any, sizeIn: any) => ({
    x: sizeIn.w,
    y: sizeIn.h,
}))

describe('Sketch', () => {
    describe('initialisation', () => {
        document.body.innerHTML = '<div>' + '  <div id="sketch" />' + '</div>'
        beforeEach(() => jest.clearAllMocks())
        it('should create a new instance of p5 without a containing element', () => {
            const instantiationFunc = () => {}
            const sketch = new Sketch(instantiationFunc)

            expect(p5).toHaveBeenCalledWith(instantiationFunc)
        })

        it('should create a new instance of p5 passing the provided id', () => {
            const instantiationFunc = () => {}
            const sketch = new Sketch(instantiationFunc, {
                divId: 'sketch',
            })

            expect(p5).toHaveBeenCalledWith(
                instantiationFunc,
                document.getElementById('sketch')
            )
        })

        it('should throw an error if there is no div with the provided id', () => {
            try {
                new Sketch(() => {}, {
                    divId: 'sketching',
                })
            } catch (e) {
                const error = e as Error
                expect(error.message.trim()).toEqual(
                    `No div with id: "sketching". \n This is the value of the divId option.`
                )
                expect(p5).not.toHaveBeenCalled()
            }
        })

        it('should instantiate an input manager', () => {
            const sketch = new Sketch(() => {})
            expect(InputManager).toHaveBeenCalledWith(sketch.sketch)
        })

        it('should set sketch.setup to an empty function if none is provided', () => {
            const sketch = new Sketch(() => {})
            expect(sketch.sketch.setup).toEqual(expect.any(Function))
        })

        it('should set sketch.draw to an empty function if none is provided', () => {
            const sketch = new Sketch(() => {})
            expect(sketch.sketch.draw).toEqual(expect.any(Function))
        })

        it('should call initialiseFunctions', () => {
            const spy = jest.spyOn(
                Sketch.prototype as any,
                'initialiseFunctions'
            )
            new Sketch(() => {})
            expect(spy).toHaveBeenCalled()
        })
    })

    describe('initialiseFunctions', () => {
        beforeEach(() => jest.clearAllMocks())
        it('should add createCanvas at window size to setup if fullscreen is true', () => {
            const sketch = new Sketch(() => {}, { fullscreen: true })

            sketch.sketch.setup()

            expect(mockCreateCanvas).toHaveBeenCalledWith(
                mockP5.windowWidth,
                mockP5.windowHeight
            )
        })

        it('should add createCanvas at provided size to setup if fullscreen is false', () => {
            const sketch = new Sketch(() => {}, { size: { w: 300, h: 400 } })

            sketch.sketch.setup()

            expect(mockCreateCanvas).toHaveBeenCalledWith(300, 400)
        })

        it('should add setCanvasColor to the sketch draw function if a canvas color is provided', () => {
            const spy = jest.spyOn(Sketch.prototype as any, 'setCanvasColor')
            const sketch = new Sketch(() => {}, {
                canvasColor: { r: 1, g: 2, b: 3, a: 4 },
            })

            sketch.sketch.draw()

            expect(spy).toHaveBeenCalled()
        })

        it('should add raising the draw event to the sketch draw function', () => {
            const sketch = new Sketch(() => {})

            sketch.sketch.draw()

            expect(Draw.raise).toHaveBeenCalled()
        })
    })

    describe('addComponent', () => {
        beforeEach(() => jest.clearAllMocks())
        it('should create an instance of the provided component passing a reference to the Sketch class', () => {
            const sketch = new Sketch(() => {})
            class MockComponent extends Component {}
            sketch.addComponent(MockComponent)

            expect(MockComponent).toHaveBeenCalledWith(sketch)
        })

        it('should create an instance of the provided component passing a any provided arguments', () => {
            const sketch = new Sketch(() => {})
            class MockComponentArgs extends Component {
                name: string
                size: number
                constructor(
                    sketchInstance: Sketch,
                    name: string,
                    size: number
                ) {
                    super(sketchInstance)
                    this.name = name
                    this.size = size
                }
            }

            const classInstance = sketch.addComponent(
                MockComponentArgs,
                'name',
                12
            )

            expect(classInstance.name).toEqual('name')
            expect(classInstance.size).toEqual(12)
        })
    })

    describe('onWindow resize', () => {
        beforeEach(() => jest.clearAllMocks())

        it('should call onWindowResize when p5 windowResized is called', () => {
            const spy = jest.spyOn(Sketch.prototype as any, 'onWindowResize')
            const sketch = new Sketch(() => {}, {})
            sketch.sketch.windowResized()

            expect(spy).toHaveBeenCalled()
        })

        it('should call resizeCanvas with the windowWidth and windowHeight if fullscreen is true', () => {
            const sketch = new Sketch(() => {}, { fullscreen: true })
            sketch.sketch.windowResized()

            expect(mockResizeCanvas).toHaveBeenCalledWith(100, 200)
        })

        it('should call resizeCanvas with the provided pixel size', () => {
            const sketch = new Sketch(() => {}, {
                size: { w: 300, h: 400 },
            })
            sketch.sketch.windowResized()

            expect(mockResizeCanvas).toHaveBeenCalledWith(300, 400)
        })
    })

    describe('setCanvasColor', () => {
        it('should call sketch background with the provided canvas color', () => {
            const canvasColor = { r: 1, g: 2, b: 3, a: 4 }
            const sketch = new Sketch(() => {}, {
                canvasColor,
            })

            sketch['setCanvasColor']()

            expect(mockBackground).toHaveBeenCalledWith(
                canvasColor.r,
                canvasColor.g,
                canvasColor.b,
                canvasColor.a
            )
        })
        it('should call sketch background with 255 alpha if none is provided', () => {
            const canvasColor = { r: 1, g: 2, b: 3 }
            const sketch = new Sketch(() => {}, {
                canvasColor,
            })

            sketch['setCanvasColor']()

            expect(mockBackground).toHaveBeenCalledWith(
                canvasColor.r,
                canvasColor.g,
                canvasColor.b,
                255
            )
        })
    })
})
