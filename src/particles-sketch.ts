import { Example } from './Example.js'
import { Sketch } from './sketch/Sketch.js'

const particles = []

const setup = (p: p5) => {
    p.background(47)
    for (let i = 0; i < 100; i++) {
        particles.push(new Example())
    }
}

const draw = (p: p5) => {
    p.background(47)
}

new Sketch(
    { fullscreen: true },
    {
        setup,
        draw,
    }
)
