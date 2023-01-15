import './addFunction'

import { useEvent } from './Events'
import p5 from 'p5'
import { addFunction } from './addFunction'
import { Component } from './Component'

interface SketchOptions {
    fullscreen: boolean
}

interface SketchClass extends Partial<p5> {
    preload?: () => void
    setup?: () => void
    draw?: () => void
    addComponent: (component: Component) => Component
    sketch: p5
    options: SketchOptions
}

export const Load = useEvent()
export const Setup = useEvent()
export const Update = useEvent()
export const Input = useEvent<[p5, string]>()

export class Sketch implements SketchClass {
    sketch!: p5
    options: SketchOptions = {
        fullscreen: true,
    }
    preload = () => {}
    setup = () => {}
    draw = () => {}
    
    constructor(options: Partial<SketchOptions>, sketch: (p: p5) => void) {
        this.options = { ...this.options, ...options }
        
        this.sketch = new p5(sketch)

        this.sketch.preload = this.sketch.preload.addFunction(Load?.raise)
        this.sketch.setup = this.sketch.setup.addFunction(Setup?.raise)
        this.sketch.draw = this.sketch.draw.addFunction(Update?.raise)

        this.sketch.windowResized = addFunction(
            this.sketch.windowResized,
            onWindowResize,
            this.sketch,
            this.options.fullscreen
        )
    }
    addComponent = (component: Component) => {
        component.load(this.sketch)
        return component
    }

}

const onWindowResize = (
    event: object | undefined,
    p: p5,
    fullscreen: boolean
) => {
    if (fullscreen) p.resizeCanvas(p.windowWidth, p.windowHeight)
}
