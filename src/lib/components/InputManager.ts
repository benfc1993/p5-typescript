type KeyEventSubscriber = (e: KeyboardEvent) => boolean
type MouseEventSubscriber = (e: MouseEvent) => boolean
type MouseDragEventSubscriber = (e: DragEvent) => boolean

export class InputManager {
    sketch: p5
    onMousePressedSubscribers: MouseEventSubscriber[] = []
    onMouseReleasedSubscribers: MouseEventSubscriber[] = []
    onMouseDraggedSubscribers: MouseDragEventSubscriber[] = []
    onKeyPressedSubscribers: KeyEventSubscriber[] = []
    onKeyReleasedSubscribers: KeyEventSubscriber[] = []

    constructor(p: p5) {
        this.sketch = p
        this.setup()
    }

    subscribeToMousePressed(sub: MouseEventSubscriber, order: 1 | -1 = -1) {
        order === -1
            ? this.onMousePressedSubscribers.push(sub)
            : this.onMousePressedSubscribers.unshift(sub)
        return this.unsubscribeMousePressedEvent.bind(this, sub)
    }

    subscribeToMouseReleased(sub: MouseEventSubscriber, order: 1 | -1 = -1) {
        order === -1
            ? this.onMouseReleasedSubscribers.push(sub)
            : this.onMouseReleasedSubscribers.unshift(sub)
        return this.unsubscribeMouseReleasedEvent.bind(this, sub)
    }

    subscribeToMouseDragged(sub: MouseDragEventSubscriber, order: 1 | -1 = -1) {
        order === -1
            ? this.onMouseDraggedSubscribers.push(sub)
            : this.onMouseDraggedSubscribers.unshift(sub)
        return this.unsubscribeMouseDraggedEvent.bind(this, sub)
    }

    subscribeToKeyPressed(sub: KeyEventSubscriber, order: 1 | -1 = -1) {
        order === -1
            ? this.onKeyPressedSubscribers.push(sub)
            : this.onKeyPressedSubscribers.unshift(sub)
        return this.unsubscribeKeyPressedEvent.bind(this, sub)
    }

    subscribeToKeyReleased(sub: KeyEventSubscriber, order: 1 | -1 = -1) {
        order === -1
            ? this.onKeyReleasedSubscribers.push(sub)
            : this.onKeyReleasedSubscribers.unshift(sub)
        return this.unsubscribeKeyReleasedEvent.bind(this, sub)
    }

    unsubscribeMousePressedEvent(sub: MouseEventSubscriber) {
        const subs = new Set(this.onMousePressedSubscribers)
        subs.delete(sub)
        this.onMousePressedSubscribers = Array.from(subs)
    }

    unsubscribeMouseReleasedEvent(sub: MouseEventSubscriber) {
        const subs = new Set(this.onMouseReleasedSubscribers)
        subs.delete(sub)
        this.onMouseReleasedSubscribers = Array.from(subs)
    }

    unsubscribeMouseDraggedEvent(sub: MouseDragEventSubscriber) {
        const subs = new Set(this.onMouseDraggedSubscribers)
        subs.delete(sub)
        this.onMouseDraggedSubscribers = Array.from(subs)
    }

    unsubscribeKeyPressedEvent(sub: KeyEventSubscriber) {
        const subs = new Set(this.onKeyPressedSubscribers)
        subs.delete(sub)
        this.onKeyPressedSubscribers = Array.from(subs)
    }

    unsubscribeKeyReleasedEvent(sub: KeyEventSubscriber) {
        const subs = new Set(this.onKeyReleasedSubscribers)
        subs.delete(sub)
        this.onKeyReleasedSubscribers = Array.from(subs)
    }

    onMousePressed(event?: MouseEvent) {
        if (!event) return

        if (
            this.sketch.mouseX < 0 ||
            this.sketch.mouseX > this.sketch.width ||
            this.sketch.mouseY < 0 ||
            this.sketch.mouseY > this.sketch.height
        )
            return
        event.preventDefault()
        for (const subscriber of this.onMousePressedSubscribers) {
            const handled = subscriber(event)
            if (handled) return
        }
    }

    onMouseReleased(event?: MouseEvent) {
        if (!event) return

        if (
            this.sketch.mouseX < 0 ||
            this.sketch.mouseX > this.sketch.width ||
            this.sketch.mouseY < 0 ||
            this.sketch.mouseY > this.sketch.height
        )
            return
        event.preventDefault()
        for (const subscriber of this.onMouseReleasedSubscribers) {
            const handled = subscriber(event)
            if (handled) return
        }
    }

    onMouseDragged(event?: DragEvent) {
        if (!event) return

        if (
            this.sketch.mouseX < 0 ||
            this.sketch.mouseX > this.sketch.width ||
            this.sketch.mouseY < 0 ||
            this.sketch.mouseY > this.sketch.height
        )
            return
        event.preventDefault()
        for (const subscriber of this.onMouseDraggedSubscribers) {
            const handled = subscriber(event)
            if (handled) return
        }
    }

    onKeyPress(event?: KeyboardEvent) {
        if (!event) return
        for (const subscriber of this.onKeyPressedSubscribers) {
            const handled = subscriber(event)
            if (handled) return
        }
    }

    onKeyRelease(event?: KeyboardEvent) {
        if (!event) return
        for (const subscriber of this.onKeyReleasedSubscribers) {
            const handled = subscriber(event)
            if (handled) return
        }
    }

    isKeyDown(code: keyof typeof keyCodeConversions): boolean {
        return this.sketch.keyIsDown(keyCodeConversions[code])
    }

    setup(): void {
        this.sketch.mousePressed = this.onMousePressed.bind(this)
        this.sketch.mouseReleased = this.onMouseReleased.bind(this)
        this.sketch.mouseDragged = this.onMouseDragged.bind(this)
        this.sketch.keyPressed = this.onKeyPress.bind(this)
        this.sketch.keyReleased = this.onKeyRelease.bind(this)
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
