import { Draw } from './SketchLoopEvents'
import {
    InputManager,
    KeyEventSubscriber,
    MouseDragEventSubscriber,
    MouseEventSubscriber,
    ScrollEventSubscriber,
} from './InputManager'
import { Sketch } from './Sketch'
import { PixelPosition, Position } from '@libTypes'
import { PercentageToPixel } from '@utils'
import { ExtendedP5 } from './ExtendedP5'

export interface ComponentClass {
    position: Position
    pixelPosition: PixelPosition
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
    protected zIndex: number
    protected eventUnSubscriptions: {
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

    protected subscribeToMousePressed(sub: MouseEventSubscriber) {
        this.addUnSubscription(
            'mousePressed',
            this.input.subscribeToMousePressed(sub, this.zIndex)
        )
    }

    protected subscribeToMouseReleased(sub: MouseEventSubscriber) {
        this.addUnSubscription(
            'mouseReleased',
            this.input.subscribeToMouseReleased(sub, this.zIndex)
        )
    }

    protected subscribeToMouseDragged(sub: MouseDragEventSubscriber) {
        this.addUnSubscription(
            'mouseDragged',
            this.input.subscribeToMouseDragged(sub, this.zIndex)
        )
    }

    protected subscribeToKeyPressed(sub: KeyEventSubscriber) {
        this.addUnSubscription(
            'keyPressed',
            this.input.subscribeToKeyPressed(sub, this.zIndex)
        )
    }

    protected subscribeToKeyReleased(sub: KeyEventSubscriber) {
        this.addUnSubscription(
            'keyReleased',
            this.input.subscribeToKeyReleased(sub, this.zIndex)
        )
    }

    protected subscribeToScroll(sub: ScrollEventSubscriber) {
        this.addUnSubscription(
            'scrolled',
            this.input.subscribeToScrolled(sub, this.zIndex)
        )
    }

    protected addUnSubscription(key: string, unSubscriptionFn: () => void) {
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
