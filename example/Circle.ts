import p5 from 'p5'
import { addFunction, Component, Sketch } from '../src/lib'

export class Circle extends Component {
    position!: p5.Vector
    dragOffset!: p5.Vector
    velocity!: p5.Vector
    color!: { r: number; g: number; b: number }
    dragging!: boolean
    radius!: number

    constructor(sketchInstance: Sketch) {
        super(sketchInstance)
        this.setup()
    }
    setup(): void {
        this.position = new p5.Vector(
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
        this.dragging = false
        this.input.subscribeToClick(this.mousePressed.bind(this), 1)

        this.input.subscribeToMouseReleased(this.mouseReleased.bind(this), 1)
    }
    mousePressed(event?: MouseEvent) {
        const x = this.sketch.winMouseX - this.position.x
        const y = this.sketch.winMouseY - this.position.y
        const isInRadius = x * x + y * y <= this.radius * this.radius

        if (!this.dragging && isInRadius) {
            this.dragOffset.x = this.sketch.winMouseX - this.position.x
            this.dragOffset.y = this.sketch.winMouseY - this.position.y
            this.dragging = true
            return true
        }
        return false
    }

    mouseReleased(event: MouseEvent) {
        this.dragging = false
        return false
    }

    draw(): void {
        if (this.dragging) {
            this.position.x = this.sketch.winMouseX - this.dragOffset.x
            this.position.y = this.sketch.winMouseY - this.dragOffset.y
        }

        if (this.position.x < 0 || this.position.x > this.sketch.width)
            this.position.x =
                (this.position.x + this.sketch.width) % this.sketch.width
        if (this.position.y < 0 || this.position.y > this.sketch.height)
            this.position.y =
                (this.position.y + this.sketch.height) % this.sketch.height
        this.velocity.add(p5.Vector.random2D().setMag(1))

        const scaledVelocity: p5.Vector = new p5.Vector()
        p5.Vector.mult(
            this.velocity,
            this.sketch.deltaTime / 1000,
            scaledVelocity
        )

        this.position.add(scaledVelocity)
        this.sketch.push()
        this.sketch.noStroke()
        this.sketch.fill(this.color.r, this.color.g, this.color.b)
        this.sketch.circle(this.position.x, this.position.y, this.radius * 2)
        this.sketch.pop()
    }
}
