import { Draw } from './SketchLoopEvents'
import { InputManager } from './InputManager'
import { Sketch } from './Sketch'

export interface ComponentClass {
    eventUnsubscriptions: {
        draw: () => void
    }
    onLoad: () => void
    draw: () => void
    onDestroy: () => void
}

export abstract class Component implements ComponentClass {
    eventUnsubscriptions: { draw: () => void }

    protected sketchInstance!: Sketch

    get sketch(): p5 {
        return this.sketchInstance.sketch
    }

    get input(): InputManager {
        return this.sketchInstance.inputManager
    }

    constructor(sketchInstance: Sketch) {
        this.sketchInstance = sketchInstance
        this.eventUnsubscriptions = {
            draw: Draw.subscribe(this.draw.bind(this)),
        }
    }

    onLoad() {}
    draw() {}
    onDestroy() {}
}
