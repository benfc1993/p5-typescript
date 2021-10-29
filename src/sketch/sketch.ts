import Example from '../Example.js'

const Load = new Event('preLoad')
const Setup = new Event('setup')
const Update = new Event('update')

export const p = new p5(function (p: p5) {
    p.preload = () => {
        dispatchEvent(Load)
    }
    p.setup = () => {
        dispatchEvent(Setup)
        p.createCanvas(p.windowWidth, p.windowHeight)
        p.background(127)
        for (let i = 0; i < 300; i++) {
            new Example()
        }
    }

    p.draw = () => {
        p.background(47)
        dispatchEvent(Update)
    }
})
