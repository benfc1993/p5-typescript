import { p } from './sketch/sketch.js'

export default class Example {
    position: p5.Vector
    velocity: p5.Vector
    color: { r: number; g: number; b: number }
    constructor() {
        window.addEventListener('update', () => this.update())
        this.position = p.createVector(p.width / 2, p.height / 2, 10)
        this.velocity = p5.Vector.random2D()
        this.color = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
        }
    }
    update(): void {
        if (this.position.x < 0 || this.position.x > p.width)
            this.position.x = (this.position.x + p.width) % p.width
        if (this.position.y < 0 || this.position.y > p.height)
            this.position.y = (this.position.y + p.height) % p.height
        this.velocity.add(p5.Vector.random2D().setMag(10))
                
        const scaledVelocity: p5.Vector = new p5.Vector()
        p5.Vector.mult(this.velocity, p.deltaTime / 1000, scaledVelocity)
        
        this.position.add(scaledVelocity)
        p.push()
        p.noStroke()
        p.fill(this.color.r, this.color.g, this.color.b)
        p.ellipse(this.position.x, this.position.y, 10)
        p.pop()
    }
}
