import { Example } from './Example'
import { Component, Sketch } from './sketch'

const particles: Component[] = []

new Sketch(
    {
        fullscreen: true,
    },
    (p: p5) => {
        p.preload = () => {}
        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight, 'p2d')
            p.background(120, 200, 187)
            for (let i = 0; i < 100; i++) {
                particles.push(new Example(p))
            }
        }
        p.draw = () => {
            p.background(47)
        }
    }
)
