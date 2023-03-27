export const multiply = (a: number, b: number) => a * b

export const exponent = (a: number, b: number) => Math.pow(a, b)

/**
 * Divide two numbers
 * @param a
 * @param b
 * @returns
 */
export const divide = (a: number, b: number) => {
	if (b === 0) throw new Error('div by zero')
	return a / b
}

export default { multiply, divide, exponent }
