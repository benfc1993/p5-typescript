import { useEvent } from './Events.js'

interface SketchArgs {
    preload?: (p: p5) => void
    setup?: (p: p5) => void
    windowResized?: (p: p5) => void
    draw?: (p: p5) => void
}

interface SketchOptions {
    fullscreen?: boolean
}

interface SketchClass extends SketchArgs {
    sketch: p5
    options: SketchOptions
}

export const Load = useEvent<p5>()
export const Setup = useEvent<p5>()
export const Update = useEvent<p5>()

export class Sketch implements SketchClass {
    sketch: p5
    options: SketchOptions
    preload = (p: p5) => {}
    setup = (p: p5) => {}
    windowResized = (p: p5) => {}
    draw = (p: p5) => {}

    constructor(options: Partial<SketchOptions>, args: Partial<SketchArgs>) {
        if (args.preload) this.preload = args.preload
        if (args.setup) this.setup = args.setup
        if (args.windowResized) this.windowResized = args.windowResized
        if (args.draw) this.draw = args.draw
        this.options = options
        this.start(this)
    }

    start(ctx: Sketch) {
        this.sketch = new p5(function (p: p5) {
            p.preload = function () {
                ctx?.preload(p)
                Load.raise(p)
            }
            p.setup = function () {
                if (ctx.options.fullscreen)
                    p.createCanvas(p.windowWidth, p.windowHeight)

                ctx?.setup(p)
                Setup.raise(p)
            }

            p.draw = () => {
                ctx?.draw(p)
                Update.raise(p)
            }
            p.windowResized = () => {
                if (ctx.options.fullscreen)
                    p.resizeCanvas(p.windowWidth, p.windowHeight)
                ctx?.windowResized(p)
            }
        })
    }
}
