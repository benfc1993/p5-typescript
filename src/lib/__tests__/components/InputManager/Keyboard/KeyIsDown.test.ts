import { InputManager } from '../../../../components/InputManager'

const mockP5 = {
    keyIsDown: (key: number) => key === 18,
    mouseX: 0,
    mouseY: 0,
    width: 10,
    height: 10,
} as any as p5

jest.mock('p5', (...args: any[]) =>
    jest.fn(...args).mockImplementation((...args) => ({
        ...mockP5,
        ...(args[1] && { div: args[1] }),
    }))
)

describe('InputManager', () => {
    describe('IsKeyDown', () => {
        it('should return false if the provided key is not down', () => {
            const inputManager = new InputManager(mockP5)

            expect(inputManager.isKeyDown('ARROWDOWN')).toBe(false)
        })
    })
})
