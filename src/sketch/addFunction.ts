// 'sloppy mode'
// declare global {
//     interface Function {
//         addFunction<T extends (...args: any) => void, K>(
//             this: T,
//             fn: (...args: [...Parameters<T>, ...K[]]) => void,
//             optionalArgs?: K[]
//         ): (...args: Parameters<T>) => void
//     }
// }

// Function.prototype.addFunction = function <T extends (...args: any) => void, K>(
//     this: T,
//     fn: (...args: [...Parameters<T>, ...K[]]) => void,
//     optionalArgs?: K[]
// ): (...args: Parameters<T>) => void {
//     const cached = this

//     return (args: Parameters<T>) => {
//         if (cached != undefined) cached(args)
//         const toSpread = [
//             ...(args ? args : [args]),
//             ...(optionalArgs || []),
//         ] as [...Parameters<T>, ...K[]]
//         fn(...toSpread)
//     }
// }

export function addFunction<T>(
    primary: (...args: T[]) => void,
    secondary: (...args: (T | any)[]) => void,
    optionalArgs?: any[]
): (...args: T[]) => void {
    const cached = primary

    return (...args: T[]) => {
        if (cached != undefined) cached(...args)
        secondary(...[...args, ...(optionalArgs || [])])
    }
}

export {}
