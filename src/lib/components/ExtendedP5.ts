import p5 from 'p5'

export class ExtendedP5 extends p5 {
    section = (fn: () => void) => {
        this.push()
        fn()
        this.pop()
    }
}
