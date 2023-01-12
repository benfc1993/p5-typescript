export interface IEvent<T> {
    raise: (data: T) => void
    subscribe: (callback: (data: T) => void) => () => boolean
}

export const useEvent = <T>(): IEvent<T> => {
    const subscribers = new Set<(data: T) => void>()

    const subscribe = (callback: (data: T) => void) => {
        subscribers.add(callback)
        return () => subscribers.delete(callback)
    }

    const raise = (data: T) => {
        subscribers.forEach((subscriber) => subscriber(data))
    }

    return {
        raise,
        subscribe,
    }
}
