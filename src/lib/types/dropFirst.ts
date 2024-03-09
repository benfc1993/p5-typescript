/* eslint-disable @typescript-eslint/no-explicit-any */
export type DropFirst<T extends unknown[]> = T extends [any, ...infer U]
    ? U
    : never
