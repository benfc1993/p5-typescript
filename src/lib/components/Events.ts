export interface IEvent<T> {
    raise: (data?: T, data1?: T, data2?: T) => void
    subscribe: (callback: (data?: T) => void) => () => boolean
}

export interface IOrderedEvent<T> {
    raise: (data?: T, data1?: T, data2?: T) => void
    subscribe: (callBack: (data?: T) => void, order?: number) => () => boolean
}

export interface IBlockingOrderedEvent<T> {
    raise: (data?: T, data1?: T, data2?: T) => void
    subscribe: (
        callBack: (data?: T) => boolean,
        order?: number
    ) => () => boolean
}

type OrderedEventOptions = {
    order: 'asc' | 'desc'
    reverseGroups: boolean
}

const defaultOptions: OrderedEventOptions = {
    order: 'asc',
    reverseGroups: false,
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

export const useOrderedEvent = <T = never>(
    options: OrderedEventOptions = defaultOptions
): IOrderedEvent<T> => {
    const subscribers = new Set<{
        order: number
        callBack: (data?: T) => void
    }>()

    const subscribe = (callBack: (data?: T) => void, order: number = 1) => {
        const sub = { order, callBack }
        subscribers.add(sub)
        return () => subscribers.delete(sub)
    }

    const raise = (data?: T) => {
        const dir = options.order === 'asc' ? 1 : -1
        const subArray = Array.from(subscribers)

        if (options.reverseGroups) {
            const reversed = createReversedGroups(subArray, dir)

            for (const sub of reversed) {
                if (sub.call(data)) return
            }
        } else {
            subArray.sort((a, b) => {
                return dir * a.order - dir * b.order
            })

            for (const sub of subArray) {
                sub.callBack.call(data)
            }
        }
    }

    return {
        raise,
        subscribe,
    }
}

export const useBlockingOrderedEvent = <T = never>(
    options: OrderedEventOptions = defaultOptions
): IBlockingOrderedEvent<T> => {
    const subscribers = new Set<{
        order: number
        callBack: (data?: T) => boolean
    }>()

    const subscribe = (callBack: (data?: T) => boolean, order: number = 1) => {
        const sub = { order, callBack }
        subscribers.add(sub)
        return () => subscribers.delete(sub)
    }

    const raise = (data?: T) => {
        const dir = options.order === 'asc' ? 1 : -1
        const subArray = Array.from(subscribers)
        if (options.reverseGroups) {
            const reversed = createReversedGroups(subArray, dir)

            for (const sub of reversed) {
                if (sub.call(data)) return
            }
        } else {
            subArray.sort((a, b) => {
                return dir * a.order - dir * b.order
            })

            for (const sub of subArray) {
                if (sub.callBack.call(data)) return
            }
        }
    }

    return {
        raise,
        subscribe,
    }
}

const createReversedGroups = (
    array: { order: number; callBack: Function }[],
    dir: 1 | -1
) => {
    const grouped = array.reduce(
        (grouped: { [key: string]: Function[] }, sub) => {
            if (!(sub.order in grouped)) {
                grouped[sub.order] = []
            }
            grouped[sub.order].push(sub.callBack)
            return grouped
        },
        {}
    )
    return Object.entries(grouped)
        .sort(([keyA, valueA], [keyB, valueB]) => {
            return dir * parseInt(keyA) - dir * parseInt(keyB)
        })
        .flatMap(([key, value]) => value.reverse())
}
