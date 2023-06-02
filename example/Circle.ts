import p5 from 'p5'
import { Component, Sketch } from '../src/lib'

export class Circle extends Component {
    vector!: p5.Vector
    dragOffset!: p5.Vector
    velocity!: p5.Vector
    color!: { r: number; g: number; b: number }
    radius!: number

    constructor(sketchInstance: Sketch) {
        super(sketchInstance, 5)
    }

    onLoad(): void {
        this.vector = new p5.Vector(
            this.sketch.width / 2,
            this.sketch.height / 2,
            10
        )
        this.radius = Math.random() * 50
        this.dragOffset = new p5.Vector()
        this.velocity = p5.Vector.random2D()
        this.color = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
        }
        this.subscribeToMousePressed(this.mousePressed.bind(this))
    }

    mousePressed(event?: MouseEvent) {
        const x = this.sketch.winMouseX - this.vector.x
        const y = this.sketch.winMouseY - this.vector.y
        const isInRadius = x * x + y * y <= this.radius * this.radius

        if (isInRadius) {
            this.dragOffset.x = this.sketch.winMouseX - this.vector.x
            this.dragOffset.y = this.sketch.winMouseY - this.vector.y
            this.onDestroy()
            return true
        }
        return false
    }

    draw(): void {
        if (this.vector.x < 0 || this.vector.x > this.sketch.width)
            this.vector.x =
                (this.vector.x + this.sketch.width) % this.sketch.width
        if (this.vector.y < 0 || this.vector.y > this.sketch.height)
            this.vector.y =
                (this.vector.y + this.sketch.height) % this.sketch.height
        this.velocity.add(p5.Vector.random2D().setMag(1))

        const scaledVelocity: p5.Vector = new p5.Vector()
        p5.Vector.mult(
            this.velocity,
            this.sketch.deltaTime / 1000,
            scaledVelocity
        )

        this.vector.add(scaledVelocity)
        this.sketch.section(() => {
            this.sketch.noStroke()
            this.sketch.fill(this.color.r, this.color.g, this.color.b)
            this.sketch.circle(this.vector.x, this.vector.y, this.radius * 2)
        })
    }
}
