import { Component } from './sketch/Component.js'

export class Example extends Component {
    position: p5.Vector
    dragOffset: p5.Vector
    velocity: p5.Vector
    color: { r: number; g: number; b: number }
    dragging: boolean

    constructor() {
        super()
    }
    setup(p: p5): void {
        this.position = p.createVector(p.width / 2, p.height / 2, 10)
        this.dragOffset = new p5.Vector()
        this.velocity = p5.Vector.random2D()
        this.color = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
        }
        this.dragging = false
    }
    update(p: p5): void {
        if (p.mouseIsPressed) {
            if (
                !this.dragging &&
                p.winMouseX > this.position.x &&
                p.winMouseX < this.position.x + 100 &&
                p.winMouseY > this.position.y &&
                p.winMouseY < this.position.y + 100
            ) {
                this.dragOffset.x = p.winMouseX - this.position.x
                this.dragOffset.y = p.winMouseY - this.position.y
                this.dragging = true
                console.log(this.dragOffset)
            }
        } else {
            this.dragging = false
        }

        if (this.dragging) {
            this.position.x = p.winMouseX - this.dragOffset.x
            this.position.y = p.winMouseY - this.dragOffset.y
        }
        p.rect(this.position.x, this.position.y, 100)

        // if (this.position.x < 0 || this.position.x > p.width)
        //     this.position.x = (this.position.x + p.width) % p.width
        // if (this.position.y < 0 || this.position.y > p.height)
        //     this.position.y = (this.position.y + p.height) % p.height
        // this.velocity.add(p5.Vector.random2D().setMag(1))

        // const scaledVelocity: p5.Vector = new p5.Vector()
        // p5.Vector.mult(this.velocity, p.deltaTime / 1000, scaledVelocity)

        // this.position.add(scaledVelocity)
        // p.push()
        // p.noStroke()
        // p.fill(this.color.r, this.color.g, this.color.b)
        // p.ellipse(this.position.x, this.position.y, 10)
        // p.pop()
    }
}
