import { IBlockingOrderedEvent, useBlockingOrderedEvent } from './Events'

export type KeyEventSubscriber = (e?: KeyboardEvent) => boolean
export type MouseEventSubscriber = (e?: MouseEvent) => boolean
export type MouseDragEventSubscriber = (e?: DragEvent) => boolean

export class InputManager {
    sketch: p5
    mousePressedEvent: IBlockingOrderedEvent<MouseEvent> =
        useBlockingOrderedEvent({ order: 'desc', reverseGroups: true })
    mouseReleasedEvent: IBlockingOrderedEvent<MouseEvent> =
        useBlockingOrderedEvent({ order: 'desc', reverseGroups: true })
    mouseDraggedEvent: IBlockingOrderedEvent<DragEvent> =
        useBlockingOrderedEvent({ order: 'desc', reverseGroups: true })
    keyPressedEvent: IBlockingOrderedEvent<KeyboardEvent> =
        useBlockingOrderedEvent({ order: 'desc', reverseGroups: true })
    keyReleasedEvent: IBlockingOrderedEvent<KeyboardEvent> =
        useBlockingOrderedEvent({ order: 'desc', reverseGroups: true })

    constructor(p: p5) {
        this.sketch = p
        this.setup()
    }

    subscribeToMousePressed(sub: MouseEventSubscriber, order: number = 1) {
        return this.mousePressedEvent.subscribe(sub, order)
    }

    subscribeToMouseReleased(sub: MouseEventSubscriber, order: number = 1) {
        return this.mouseReleasedEvent.subscribe(sub, order)
    }

    subscribeToMouseDragged(sub: MouseDragEventSubscriber, order: number = 1) {
        return this.mouseDraggedEvent.subscribe(sub, order)
    }

    subscribeToKeyPressed(sub: KeyEventSubscriber, order: number = 1) {
        return this.keyPressedEvent.subscribe(sub, order)
    }

    subscribeToKeyReleased(sub: KeyEventSubscriber, order: number = 1) {
        return this.keyReleasedEvent.subscribe(sub, order)
    }

    onMousePressed(event?: MouseEvent) {
        if (!event) return

        if (this.mouseIsOutOfBounds()) return
        event.preventDefault()
        this.mousePressedEvent.raise(event)
    }

    onMouseReleased(event?: MouseEvent) {
        if (!event) return

        if (this.mouseIsOutOfBounds()) return
        event.preventDefault()
        this.mouseReleasedEvent.raise(event)
    }

    onMouseDragged(event?: DragEvent) {
        if (!event) return

        if (this.mouseIsOutOfBounds()) return
        event.preventDefault()
        this.mouseDraggedEvent.raise(event)
    }

    onKeyPressed(event?: KeyboardEvent) {
        if (!event) return
        this.keyPressedEvent.raise(event)
    }

    onKeyReleased(event?: KeyboardEvent) {
        if (!event) return
        this.keyReleasedEvent.raise(event)
    }

    isKeyDown(code: keyof typeof keyCodeConversions): boolean {
        return this.sketch.keyIsDown(keyCodeConversions[code])
    }

    setup(): void {
        this.sketch.mousePressed = this.onMousePressed.bind(this)
        this.sketch.mouseReleased = this.onMouseReleased.bind(this)
        this.sketch.mouseDragged = this.onMouseDragged.bind(this)
        this.sketch.keyPressed = this.onKeyPressed.bind(this)
        this.sketch.keyReleased = this.onKeyReleased.bind(this)
    }
    mouseIsOutOfBounds() {
        return (
            this.sketch.mouseX < 0 ||
            this.sketch.mouseX > this.sketch.width ||
            this.sketch.mouseY < 0 ||
            this.sketch.mouseY > this.sketch.height
        )
    }
}

const keyCodeConversions = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CONTROL: 17,
    ALT: 18,
    ESCAPE: 27,
    SPACE: 32,
    ARROWLEFT: 37,
    ARROWUP: 38,
    ARROWRIGHT: 39,
    ARROWDOWN: 40,
}
