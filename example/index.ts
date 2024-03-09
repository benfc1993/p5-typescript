import p5 from 'p5'
import { Circle } from './Circle'
import { Rect } from './Rect'
import { Sketch } from '../dist'

const sketch = new Sketch(
    (p: p5) => {
        p.preload = () => {}
        p.setup = () => {
            const div = document.getElementById('sketch-1')
            if (div) {
                const { width, height } = div.getBoundingClientRect()
                p.createCanvas(width, height)
            }
            for (let i = 0; i < 100; i++) {
                sketch.addComponent(Circle)
            }
        }
    },
    {
        divId: 'sketch-1',
        canvasColor: { r: 120, g: 208, b: 172 },
        size: {
            w: '75%',
            h: () => window.innerHeight * 0.75,
        },
    }
)

for (let i = 0; i < 100; i++) {
    sketch.addComponent(Rect)
}
