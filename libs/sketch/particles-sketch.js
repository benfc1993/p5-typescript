import { Example } from '../Example.js';
import { useEvent } from './Events.js';
export const Load = useEvent();
export const Setup = useEvent();
export const Update = useEvent();
export const p = new p5(function (p) {
    const particles = [];
    p.preload = () => {
        Load.raise();
    };
    p.setup = () => {
        Setup.raise();
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(127);
        for (let i = 0; i < 300; i++) {
            particles.push(new Example());
        }
    };
    p.draw = () => {
        p.background(47);
        Update.raise();
    };
});
//# sourceMappingURL=particles-sketch.js.map