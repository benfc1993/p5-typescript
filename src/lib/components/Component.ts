import { Draw } from './SketchLoopEvents'
import { InputManager } from './InputManager'
import { Sketch } from './Sketch'

export interface ComponentClass {
    eventUnsubscriptions: {
        setup: () => void
        draw: () => void
    }
    sketch: p5
    input: InputManager
    load: (p: Sketch) => void
    setup: () => void
    draw: () => void
    onDestroy: () => void
}

export abstract class Component implements ComponentClass {
    eventUnsubscriptions: { setup: () => void; draw: () => void } = {
        setup: () => {},
        draw: () => {},
    }
    sketch!: p5
    input!: InputManager

    constructor(sketchInstance?: Sketch) {
        if (sketchInstance) {
            this.load(sketchInstance)
        }
    }

    load(sketchInstance: Sketch) {
        this.sketch = sketchInstance.sketch
        this.input = sketchInstance.inputManager

        this.setup()
        this.eventUnsubscriptions.draw = Draw.subscribe(this.draw.bind(this))
    }
    setup() {}
    draw() {}
    onDestroy() {}
}
