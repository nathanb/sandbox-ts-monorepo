import { multiply as sharedMultiply } from '@potatoes/lib-shared'

export * from './add.mjs'

/**
 * Use the shared multiply; barreling here.
 * @param a
 * @param b
 * @returns
 */
export const multiplyRef = sharedMultiply
