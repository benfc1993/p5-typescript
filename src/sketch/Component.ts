import { Load, Setup, Update } from './Sketch'

export interface ComponentClass {
    sketch: p5
    load: () => void
    setup: () => void
    update: () => void
    onDestroy: () => void
}

export abstract class Component implements ComponentClass {
    sketch!: p5

    constructor(p: p5) {
        this.sketch = p
        Load.subscribe(this.load.bind(this))
        Setup.subscribe(this.setup.bind(this))
        Update.subscribe(this.update.bind(this))
    }

    load() {}
    setup() {}
    update() {}
    onDestroy() {}
}
