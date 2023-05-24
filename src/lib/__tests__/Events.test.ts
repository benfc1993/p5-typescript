import { useEvent } from '../components'

describe('Events', () => {
    describe('useEvent', () => {
        it('should return a raise function', () => {
            const { raise } = useEvent()

            expect(raise).toEqual(expect.any(Function))
        })
        it('should return a subscribe function', () => {
            const { subscribe } = useEvent()

            expect(subscribe).toEqual(expect.any(Function))
        })
    })
    describe('subscribing', () => {
        it('should add a subscriber function to the subscribers list', () => {
            const subscriber = jest.fn()
            const event = useEvent()
            event.subscribe(subscriber)
            event.raise()
            expect(subscriber).toHaveBeenCalled()
        })

        it('should not add a subscriber function to the subscribers list if it already exists', () => {
            const subscriber = jest.fn()
            const event = useEvent()
            event.subscribe(subscriber)
            event.subscribe(subscriber)
            event.raise()
            expect(subscriber).toHaveBeenCalledTimes(1)
        })
        describe('unsubscribe', () => {
            it('should return an unsubscribe function', () => {
                const subscriber = jest.fn()
                const event = useEvent()
                const unsubscribe = event.subscribe(subscriber)
                expect(unsubscribe).toEqual(expect.any(Function))
            })

            it('should remove the subscriber ', () => {
                const subscriber = jest.fn()
                const event = useEvent()
                const unsubscribe = event.subscribe(subscriber)
                unsubscribe()
                event.raise()
                expect(subscriber).not.toHaveBeenCalled()
            })
        })
    })
})
