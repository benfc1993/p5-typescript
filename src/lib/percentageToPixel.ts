export const PercentageToPixel = (
    scalar: { width: number; height: number },
    sizeIn:
        | { x: number | string; y: number | string }
        | { w: number | string; h: number | string }
): { x: number; y: number } => {
    const size =
        'x' in sizeIn
            ? {
                  x: sizeIn.x,
                  y: sizeIn.y,
              }
            : {
                  x: sizeIn.w,
                  y: sizeIn.h,
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
    if (str.match(/^-?[0-9]*$/)) return tryParseInt(str, fallback)
    if (str.match(/^-?[0-9]*(\.[0-9]*)?$/)) return tryParseFloat(str, fallback)
    return fallback
}

export const tryParseInt = (str: string, fallback: number) => {
    if (!str.match(/^-?[0-9]*$/)) return fallback

    const parsed = parseInt(str)

    const validParse = !isNaN(parsed)
    return validParse ? parsed : fallback
}

export const tryParseFloat = (str: string, fallback: number) => {
    if (!str.match(/^-?[0-9]*(\.[0-9]*)?$/)) return fallback

    const parsed = parseFloat(str)

    const validParse = !isNaN(parsed)
    return validParse ? parsed : fallback
}

const createStringComponents = (
    str: string
): { denom: number; addition: number } => {
    const components: string[] = str.split(/[+]/)
    return components.reduce(
        (splitTotals: { denom: number; addition: number }, component) => {
            ;(component as string).includes('%')
                ? (splitTotals.denom += tryParseNum(
                      (component as string).split('%')[0].trim(),
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
