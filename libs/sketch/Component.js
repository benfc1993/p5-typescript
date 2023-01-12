import { Setup, Update } from './Sketch.js';
export class Component {
    constructor() {
        Setup.subscribe(this.setup.bind(this));
        Update.subscribe(this.update.bind(this));
    }
    setup(p) { }
    update(p) { }
    onDestroy(p) { }
}
//# sourceMappingURL=Component.js.map