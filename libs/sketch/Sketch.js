import { useEvent } from './Events.js';
export const Load = useEvent();
export const Setup = useEvent();
export const Update = useEvent();
export class Sketch {
    constructor(options, args) {
        this.preload = (p) => { };
        this.setup = (p) => { };
        this.windowResized = (p) => { };
        this.draw = (p) => { };
        if (args.preload)
            this.preload = args.preload;
        if (args.setup)
            this.setup = args.setup;
        if (args.windowResized)
            this.windowResized = args.windowResized;
        if (args.draw)
            this.draw = args.draw;
        this.options = options;
        this.start(this);
    }
    start(ctx) {
        this.sketch = new p5(function (p) {
            p.preload = function () {
                ctx === null || ctx === void 0 ? void 0 : ctx.preload(p);
                Load.raise(p);
            };
            p.setup = function () {
                if (ctx.options.fullscreen)
                    p.createCanvas(p.windowWidth, p.windowHeight);
                ctx === null || ctx === void 0 ? void 0 : ctx.setup(p);
                Setup.raise(p);
            };
            p.draw = () => {
                ctx === null || ctx === void 0 ? void 0 : ctx.draw(p);
                Update.raise(p);
            };
            p.windowResized = () => {
                if (ctx.options.fullscreen)
                    p.resizeCanvas(p.windowWidth, p.windowHeight);
                ctx === null || ctx === void 0 ? void 0 : ctx.windowResized(p);
            };
        });
    }
}
//# sourceMappingURL=Sketch.js.map