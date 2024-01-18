import { multiply as sharedMultiply } from '@potatoes/lib-shared'

export const add = (a: number, b: number) => a + b

/**
 * Use the shared multiply; barreling here.
 * @param a
 * @param b
 * @returns
 */
export const multiplyRef = sharedMultiply
