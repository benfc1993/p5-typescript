export interface IEvent<T> {
    raise: (data?: T, data1?: T, data2?: T) => void
    subscribe: (callback: (data?: T) => void) => () => boolean
}

export const useEvent = <T = never>(dir: 1 | -1 = 1): IEvent<T> => {
    const subscribers = new Set<(data?: T) => void>()

    const subscribe = (callback: (data?: T) => void) => {
        subscribers.add(callback)
        return () => subscribers.delete(callback)
    }

    const raise = (data?: T) => {
        const subArray = Array.from(subscribers)
        const start = dir === 1 ? 0 : subArray.length - 1

        const comparison = (i: number) =>
            dir === 1 ? i < subArray.length : i >= 0

        for (let i = start; comparison(i); i += dir) {
            subArray[i].call(data)
        }
    }

    return {
        raise,
        subscribe,
    }
}
