import { useEvent } from '@components/Events'

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

describe('raise', () => {
    it('should loop through the subscribers forwards if the direction is default', () => {
        let index = 0
        const subscriberOne = jest.fn().mockImplementation(() => {
            index++
            return index
        })
        const subscriberTwo = jest.fn().mockImplementation(() => {
            index++
            return index
        })
        const event = useEvent()

        event.subscribe(subscriberOne)
        event.subscribe(subscriberTwo)

        event.raise()
        expect(subscriberOne).toReturnWith(1)
        expect(subscriberTwo).toReturnWith(2)
    })

    it('should loop through the subscribers backwards if the direction is set to -1', () => {
        let index = 0
        const subscriberOne = jest.fn().mockImplementation(() => {
            index++
            return index
        })
        const subscriberTwo = jest.fn().mockImplementation(() => {
            index++
            return index
        })
        const event = useEvent(-1)

        event.subscribe(subscriberOne)
        event.subscribe(subscriberTwo)

        event.raise()
        expect(subscriberTwo).toReturnWith(1)
        expect(subscriberOne).toReturnWith(2)
    })
})
