import { Circle,  Rect } from './components'
import { Component, Sketch } from '../lib'

const particles: Component[] = []

const sketch = new Sketch(
    {
        fullscreen: true,
    },
    (p: p5) => {
        p.preload = () => {}
        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight, 'p2d')
            p.background(120, 200, 187)
            for (let i = 0; i < 100; i++) {
                particles.push(new Rect(p))
            }
        }
        p.draw = () => {
            p.background(47)
        }
    }
)
for (let i = 0; i < 1000; i++) {
    sketch.addComponent(new Circle())
}