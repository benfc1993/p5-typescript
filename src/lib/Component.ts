import { Setup, Draw } from './Sketch'

export interface ComponentClass {
    eventUnsubscriptions: {
        setup: () => void
        draw: () => void
    }
    sketch: p5
    load: (p: p5) => void
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

    constructor(p?: p5) {
        if (p) this.sketch = p
        this.eventUnsubscriptions.setup = Setup.subscribe(this.setup.bind(this))
        this.eventUnsubscriptions.draw = Draw.subscribe(this.draw.bind(this))
    }

    load(p: p5) {
        this.sketch = p
        this.setup()
        this.eventUnsubscriptions.setup()
    }
    setup() {}
    draw() {}
    onDestroy() {}
}
