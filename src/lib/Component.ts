import { Load, Setup, Update } from './Sketch'

export interface ComponentClass {
    sketch: p5
    load: (p: p5) => void
    setup: () => void
    update: () => void
    onDestroy: () => void
}

export abstract class Component implements ComponentClass {
    sketch!: p5

    constructor(p?: p5) {
        if(p) this.sketch = p
        Setup.subscribe(this.setup.bind(this))
        Update.subscribe(this.update.bind(this))
    }
    
    load(p: p5) {
        this.sketch = p
    }
    setup() {}
    update() {}
    onDestroy() {}
}
