type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never
type LastOf<T> = UnionToIntersection<
    T extends any ? () => T : never
> extends () => infer R
    ? R
    : never

type Push<T extends any[], V> = [...T, V]

type TuplifyUnion<
    T,
    L = LastOf<T>,
    N = [T] extends [never] ? true : false
> = true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>

export type ObjectToTuple<
    T,
    KS extends any[] = TuplifyUnion<keyof T>,
    R extends any[] = []
> = KS extends [infer K, ...infer KT]
    ? ObjectToTuple<T, KT, [...R, T[K & keyof T]]>
    : R

export type TupleDifference<
    T extends any[],
    U extends [...T, ...any]
> = IsUndefined<
    ObjectToTuple<
        Pick<U, Exclude<keyof U, keyof T>> extends infer R ? R : never
    >
>

type IsUndefined<T> = T extends Array<undefined> ? [] : T
