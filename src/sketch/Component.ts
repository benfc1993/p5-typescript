import { Setup, Update } from './Sketch'

export interface ComponentClass {
    setup: (p: p5) => void
    update: (p: p5) => void
    onDestroy: (p: p5) => void
}

export abstract class Component implements ComponentClass {
    constructor() {
        Setup.subscribe(this.setup.bind(this))
        Update.subscribe(this.update.bind(this))
    }

    setup(p: p5) {}
    update(p: p5) {}
    onDestroy(p: p5) {}
}
