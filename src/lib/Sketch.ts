import { useEvent } from './Events'
import p5 from 'p5'
import { addFunction } from './addFunction'
import { Component } from './Component'

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
}

interface SketchClass extends Partial<p5> {
    addComponent: (component: Component) => Component
    sketch: p5
    options: SketchOptions
}

export const Setup = useEvent()
export const Draw = useEvent()
export const Input = useEvent<[p5, string]>()

export class Sketch implements SketchClass {
    sketch!: p5
    options: SketchOptions = {
        fullscreen: false,
        canvasColor: null,
    }

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

        this.initialiseFunctions()
    }

    addComponent = (component: Component) => {
        component.load(this.sketch)
        return component
    }

    private initialiseFunctions() {
        this.sketch.setup = this.sketch.setup.addFunction(() => {
            if (this.options.fullscreen) {
                this.sketch.createCanvas(
                    this.sketch.windowWidth,
                    this.sketch.windowHeight
                )
            }
            Setup?.raise()
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
        if (this.options.fullscreen)
            this.sketch.resizeCanvas(
                this.sketch.windowWidth,
                this.sketch.windowHeight
            )
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
