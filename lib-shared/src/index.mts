export const multiply = (a: number, b: number) => a * b
export const divide = (a: number, b: number) => {
	if (b === 0) throw new Error('div by zero')
	return a / b
}