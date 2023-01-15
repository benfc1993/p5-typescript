// 'sloppy mode'

import { TupleDifference } from './types/tupleDifference'

declare global {
    interface Function {
        addFunction<
            T extends (...args: any) => void,
            K extends (...args: [...Parameters<T>, ...any]) => void
        >(
            this: T,
            secondary: K,
            ...optionalArgs: TupleDifference<Parameters<T>, Parameters<K>>
        ): (...args: Parameters<T>) => void
    }
}

Function.prototype.addFunction = function <
    T extends (...args: any) => void,
    K extends (...args: [...Parameters<T>, ...any]) => void
>(
    this: T,
    secondary: K,
    ...optionalArgs: TupleDifference<Parameters<T>, Parameters<K>>
): (...args: Parameters<T>) => void {
    const cached = this

    return (...args: Parameters<T>) => {
        if (cached != undefined) cached(...args)
        secondary(...[...args, ...(optionalArgs || [])])
    }
}

export function addFunction<
    T extends (...args: any) => void,
    K extends (...args: [...Parameters<T>, ...any]) => void
>(
    this: T,
    secondary: K,
    ...optionalArgs: TupleDifference<Parameters<T>, Parameters<K>>
): (...args: Parameters<T>) => void {
    const cached = this

    return (...args: Parameters<T>) => {
        if (cached != undefined) cached(...args)
        secondary(...[...args, ...(optionalArgs || [])])
    }
}

export {}
