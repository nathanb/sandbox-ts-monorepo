import shared from '@potatoes/lib-shared'

export const add = (a: number, b: number) => a + b

/**
 * Use the shared multiply
 * @param a
 * @param b
 * @returns
 */
export const multiplyRef = shared.multiply
