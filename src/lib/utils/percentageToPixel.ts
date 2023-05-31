export const PercentageToPixel = (
    scalar: { width: number; height: number },
    sizeIn:
        | {
              x: number | string | (() => number)
              y: number | string | (() => number)
          }
        | {
              w: number | string | (() => number)
              h: number | string | (() => number)
          }
): { x: number; y: number } => {
    const size: { x: number | string; y: number | string } =
        'x' in sizeIn
            ? {
                  x: sizeIn.x instanceof Function ? sizeIn.x() : sizeIn.x,
                  y: sizeIn.y instanceof Function ? sizeIn.y() : sizeIn.y,
              }
            : {
                  x: sizeIn.w instanceof Function ? sizeIn.w() : sizeIn.w,
                  y: sizeIn.h instanceof Function ? sizeIn.h() : sizeIn.h,
              }

    let x = 0
    let y = 0

    if (typeof size.x === 'string') {
        const { denom, addition } = createStringComponents(size.x)
        x = scalar.width / (100 / denom) + addition
    } else {
        x = size.x
    }

    if (typeof size.y === 'string') {
        const { denom, addition } = createStringComponents(size.y)
        y = scalar.height / (100 / denom) + addition
    } else {
        y = size.y
    }

    return { x, y }
}

export const tryParseNum = (str: string, fallback: number) => {
    if (str.match(/^-?[0-9]*$/)) return parseInt(str)
    if (str.match(/^-?[0-9]*(\.[0-9]*)?$/)) return parseFloat(str)
    return fallback
}

const createStringComponents = (
    str: string
): { denom: number; addition: number } => {
    const components: string[] = str.replace(/\s/g, '').split(/[+]/)

    const numbers = []
    for (const component of components) {
        let currentNumber = ''
        for (const char of component) {
            if (char === '-') {
                currentNumber = '-'
            } else {
                currentNumber += char
            }
        }
        numbers.push(currentNumber)
    }

    return numbers.reduce(
        (splitTotals: { denom: number; addition: number }, component, idx) => {
            ;(component as string).includes('%')
                ? (splitTotals.denom += tryParseNum(
                      (component as string).split('%')[0],
                      0
                  ))
                : (splitTotals.addition += tryParseNum(
                      (component as string).trim(),
                      0
                  ))
            return splitTotals
        },
        { denom: 0, addition: 0 }
    )
}
