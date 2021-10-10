const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(400, 400)
        p.background(127)
    }
}

new p5(sketch)

const sketch2 = (p: p5) => {
    p.setup = () => {
        p.createCanvas(400, 400)
        p.background(0)
    }
}

new p5(sketch2)
