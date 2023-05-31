import { Draw } from './SketchLoopEvents'
import { InputManager } from './InputManager'
import { Sketch } from './Sketch'

export interface ComponentClass {
    zIndex: number
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
    zIndex: number
    eventUnsubscriptions: { draw: () => void }

    protected sketchInstance!: T

    get sketch(): p5 {
        return this.sketchInstance.sketch
    }

    get input(): InputManager {
        return this.sketchInstance.inputManager
    }

    constructor(sketchInstance: T, zIndex: number = 1) {
        this.sketchInstance = sketchInstance
        this.zIndex = zIndex
        this.eventUnsubscriptions = {
            draw: Draw.subscribe(this.draw.bind(this), this.zIndex),
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
