import p5 from 'p5'
import { addFunction } from '../utils/addFunction'
import { Component } from './Component'
import { PercentageToPixel } from '../utils'
import { InputManager } from './InputManager'
import { Draw } from './SketchLoopEvents'

type CanvasColor = {
    r: number
    g: number
    b: number
    a?: number
}

interface SketchOptions {
    divId?: string
    fullscreen?: boolean
    canvasColor?: CanvasColor | null
    size: {
        w: number | string | (() => number)
        h: number | string | (() => number)
    }
}

interface SketchClass extends Partial<Omit<p5, 'get'>> {
    addComponent: <T extends Component>(component: T) => T
    sketch: p5
    options: SketchOptions
    inputManager: InputManager
}

export class Sketch implements SketchClass {
    sketch!: p5
    options: SketchOptions = {
        fullscreen: false,
        canvasColor: null,
        size: {
            w: 800,
            h: 400,
        },
    }

    inputManager: InputManager

    constructor(sketch: (p: p5) => void, options?: Partial<SketchOptions>) {
        this.options = { ...this.options, ...options }

        if (this.options.divId) {
            const div = document.getElementById(this.options.divId)
            if (!div)
                throw new Error(
                    `No div with id: "${this.options.divId}". \n This is the value of the divId option.`
                )
            this.sketch = new p5(sketch, div)
        } else {
            this.sketch = new p5(sketch)
        }
        this.inputManager = new InputManager(this.sketch)
        this.initialiseFunctions()
    }

    addComponent = <T extends Component>(component: T) => {
        component.load(this)
        return component
    }

    private initialiseFunctions() {
        this.sketch.setup = this.sketch.setup.addFunction(() => {
            if (this.options.fullscreen) {
                this.sketch.createCanvas(
                    this.sketch.windowWidth,
                    this.sketch.windowHeight
                )
            } else {
                const { x, y } = PercentageToPixel(
                    { width: window.innerWidth, height: window.innerHeight },
                    this.options.size
                )

                this.sketch.createCanvas(x, y)
            }
            this.inputManager.setup()
        })
        this.sketch.draw = this.sketch.draw.addFunction(() => {
            if (this.options.canvasColor) this.setCanvasColor()
            Draw?.raise()
        })

        this.sketch.windowResized = addFunction(
            this.sketch.windowResized,
            this.onWindowResize
        )
    }
    private onWindowResize = (event: object | undefined) => {
        if (this.options.fullscreen) {
            this.sketch.resizeCanvas(
                this.sketch.windowWidth,
                this.sketch.windowHeight
            )
        } else {
            const { x, y } = PercentageToPixel(
                { width: window.innerWidth, height: window.innerHeight },
                this.options.size
            )

            this.sketch.resizeCanvas(x, y)
        }
    }

    private setCanvasColor = () => {
        if (this.options.canvasColor)
            this.sketch.background(
                this.options.canvasColor.r,
                this.options.canvasColor.g,
                this.options.canvasColor.b,
                this.options.canvasColor.a || 255
            )
    }
}
