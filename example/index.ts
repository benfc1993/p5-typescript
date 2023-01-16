import { Circle } from './Circle'
import { Rect } from './Rect'
import { Sketch } from '../src/lib'
import p5 from 'p5'

const sketch = new Sketch(
    (p: p5) => {
        p.preload = () => {}
        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight)
            for (let i = 0; i < 1000; i++) {
                sketch.addComponent(new Circle())
                sketch.addComponent(new Rect())
            }
        }
        p.draw = () => {}
    },
    {
        fullscreen: true,
        canvasColor: { r: 120, g: 208, b: 172 },
    }
)
