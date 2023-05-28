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

export abstract class Component<T extends Sketch = Sketch>
    implements ComponentClass
{
    eventUnsubscriptions: { draw: () => void }

    protected sketchInstance!: T

    get sketch(): p5 {
        return this.sketchInstance.sketch
    }

    get input(): InputManager {
        return this.sketchInstance.inputManager
    }

    constructor(sketchInstance: T) {
        this.sketchInstance = sketchInstance
        this.eventUnsubscriptions = {
            draw: Draw.subscribe(this.draw.bind(this)),
        }
    }

    onLoad() {}
    draw() {}
    onDestroy() {
        Object.values(this.eventUnsubscriptions).forEach((unsubscription) =>
            unsubscription()
        )
    }
}
