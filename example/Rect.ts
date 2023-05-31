import p5 from 'p5'
import { Component, Sketch, addFunction } from '../src/lib'

export class Rect extends Component {
    vector!: p5.Vector
    dragOffset!: p5.Vector
    velocity!: p5.Vector
    color!: { r: number; g: number; b: number }
    dragging!: boolean
    width!: number

    constructor(sketchInstance: Sketch) {
        super(sketchInstance)
    }

    onLoad(): void {
        this.vector = new p5.Vector(
            this.sketch.width / 2,
            this.sketch.height / 2,
            10
        )
        this.width = Math.random() * 100
        this.dragOffset = new p5.Vector()
        this.velocity = p5.Vector.random2D()
        this.color = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
        }
        this.dragging = false
        this.subscribeToMousePressed(this.mousePressed.bind(this))

        this.subscribeToMouseReleased(this.mouseReleased.bind(this))
    }

    mousePressed(event?: MouseEvent): boolean {
        if (
            !this.dragging &&
            this.sketch.winMouseX > this.vector.x &&
            this.sketch.winMouseX < this.vector.x + this.width &&
            this.sketch.winMouseY > this.vector.y &&
            this.sketch.winMouseY < this.vector.y + this.width
        ) {
            this.dragOffset.x = this.sketch.winMouseX - this.vector.x
            this.dragOffset.y = this.sketch.winMouseY - this.vector.y
            this.dragging = true
            return true
        }

        return false
    }

    mouseReleased(event?: MouseEvent) {
        this.dragging = false
        return false
    }

    draw(): void {
        if (this.dragging) {
            this.vector.x = this.sketch.winMouseX - this.dragOffset.x
            this.vector.y = this.sketch.winMouseY - this.dragOffset.y
        }

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
        this.sketch.push()
        this.sketch.noStroke()
        this.sketch.fill(this.color.r, this.color.g, this.color.b)
        this.sketch.rect(this.vector.x, this.vector.y, this.width)
        this.sketch.pop()
    }
}
