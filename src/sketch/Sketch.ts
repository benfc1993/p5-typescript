import './addFunction'

import { useEvent } from './Events'
import p5 from 'p5'

interface SketchArgs {
    preload?: (p: p5) => void
    setup?: (p: p5) => void
    draw?: (p: p5) => void
}

interface SketchOptions {
    fullscreen: boolean
}

interface SketchClass extends Partial<p5> {
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
        const p = new p5(sketch)
        p.preload = p.preload.addFunction(Load?.raise)
        p.setup = p.setup.addFunction(Setup?.raise)
        p.draw = p.draw.addFunction(Update?.raise)

        p.windowResized = p.windowResized.addFunction(
            onWindowResize,
            p,
            this.options.fullscreen
        )
    }
}

const onWindowResize = (
    event: object | undefined,
    p: p5,
    fullscreen: boolean
) => {
    if (fullscreen) p.resizeCanvas(p.windowWidth, p.windowHeight)
}
