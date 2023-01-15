import { Circle,  Rect } from './components'
import { Component, Sketch } from '../src/lib'
import p5 from 'p5'

const particles: Component[] = []

const sketch = new Sketch(
    (p: p5) => {
        p.preload = () => {}
        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight)
            for (let i = 0; i < 100; i++) {
                particles.push(new Rect(p))
            }
        }
        p.draw = () => {
        }
    },
    {
        fullscreen: true,
        canvasColor: {r: 120, g: 208, b: 172}
    }
)
for (let i = 0; i < 1000; i++) {
    sketch.addComponent(new Circle())
}