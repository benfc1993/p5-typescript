import { Draw } from './SketchLoopEvents'
import {
    InputManager,
    KeyEventSubscriber,
    MouseDragEventSubscriber,
    MouseEventSubscriber,
} from './InputManager'
import { Sketch } from './Sketch'
import { PixelPosition, Position } from '@libTypes'
import { PercentageToPixel } from '@utils'
import { ExtendedP5 } from './ExtendedP5'

export interface ComponentClass {
    zIndex: number
    eventUnSubscriptions: {
        [key: string]: (() => void)[]
    }
    onLoad: () => void
    draw: () => void
    onDestroy: () => void
}

export abstract class Component<T extends Sketch = Sketch>
    implements ComponentClass
{
    position: Position = { x: 0, y: 0 }
    get pixelPosition(): PixelPosition {
        return PercentageToPixel(this.sketch, this.position)
    }
    zIndex: number
    eventUnSubscriptions: {
        [key: string]: (() => void)[]
    }

    protected sketchInstance!: T

    get sketch(): ExtendedP5 {
        return this.sketchInstance.sketch
    }

    get input(): InputManager {
        return this.sketchInstance.inputManager
    }

    constructor(sketchInstance: T, zIndex: number = 1) {
        this.sketchInstance = sketchInstance
        this.zIndex = zIndex
        this.eventUnSubscriptions = {
            draw: [Draw.subscribe(this.draw.bind(this), this.zIndex)],
        }
    }

    subscribeToMousePressed(sub: MouseEventSubscriber) {
        this.addUnSubscription(
            'mousePressed',
            this.input.subscribeToMousePressed(sub, this.zIndex)
        )
    }

    subscribeToMouseReleased(sub: MouseEventSubscriber) {
        this.addUnSubscription(
            'mouseReleased',
            this.input.subscribeToMouseReleased(sub, this.zIndex)
        )
    }

    subscribeToMouseDragged(sub: MouseDragEventSubscriber) {
        this.addUnSubscription(
            'mouseDragged',
            this.input.subscribeToMouseDragged(sub, this.zIndex)
        )
    }

    subscribeToKeyPressed(sub: KeyEventSubscriber) {
        this.addUnSubscription(
            'keyPressed',
            this.input.subscribeToKeyPressed(sub, this.zIndex)
        )
    }

    subscribeToKeyReleased(sub: KeyEventSubscriber) {
        this.addUnSubscription(
            'keyReleased',
            this.input.subscribeToKeyReleased(sub, this.zIndex)
        )
    }

    addUnSubscription(key: string, unSubscriptionFn: () => void) {
        if (!(key in this.eventUnSubscriptions)) {
            this.eventUnSubscriptions[key] = []
        }

        this.eventUnSubscriptions[key].push(unSubscriptionFn)
    }

    onLoad() {}
    draw() {}
    onDestroy() {
        Object.values(this.eventUnSubscriptions).forEach((unSubscriptions) =>
            unSubscriptions.forEach((unSubscription) => unSubscription())
        )
    }
}
