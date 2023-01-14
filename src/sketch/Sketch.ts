import './addFunction'

import { useEvent } from './Events'
import p5 from 'p5'
import { addFunction } from './addFunction'

interface SketchArgs {
    preload?: (p: p5) => void
    setup?: (p: p5) => void
    windowResized?: (p: p5) => void
    draw?: (p: p5) => void
}

interface SketchOptions {
    fullscreen?: boolean
}

interface SketchClass extends Partial<p5> {
    sketch: p5
    options: SketchOptions
}

export const Load = useEvent<void>()
export const Setup = useEvent<void>()
export const Update = useEvent<void>()
export const Input = useEvent<[p5, string]>()

export class Sketch implements SketchClass {
    sketch!: p5
    options: SketchOptions
    preload = () => {}
    setup = () => {}
    windowResized = (p: p5) => {}
    draw = () => {}

    constructor(options: Partial<SketchOptions>, sketch: (p: p5) => void) {
        this.options = options
        const p = new p5(sketch)
        p.preload = addFunction(p.preload, Load?.raise)
        p.setup = addFunction(p.setup, Setup?.raise)
        p.draw = addFunction(p.draw, Update?.raise)
        p.windowResized = addFunction(p.windowResized, onWindowResize, [
            p,
            this.options.fullscreen,
        ])
        // Object.entries(args)
        // if (args.preload) this.preload = args.preload
        // if (args.setup) this.setup = args.setup
        // if (args.windowResized) this.windowResized = args.windowResized
        // if (args.draw) this.draw = args.draw
    }

    // start(ctx: Sketch) {
    //     this.sketch = new p5(function (p: p5) {
    //         p.preload = function () {
    //             ctx?.preload(p)
    //         }
    //         p.setup = function () {
    //             if (ctx.options.fullscreen)
    //                 p.createCanvas(p.windowWidth, p.windowHeight, 'p2d')

    //             ctx?.setup(p)
    //             Setup.raise(p)
    //         }

    //         p.mousePressed = () => Input.raise([p, 'mouse-down'])
    //         p.mouseReleased = () => Input.raise([p, 'mouse-up'])
    //         p.draw = () => {
    //             ctx?.draw(p)
    //             Update.raise(p)
    //         }
    //     })
    // }
}

const onWindowResize = (
    event: object | undefined,
    p: p5,
    fullscreen: boolean
) => {
    if (fullscreen) p.resizeCanvas(p.windowWidth, p.windowHeight)
}
