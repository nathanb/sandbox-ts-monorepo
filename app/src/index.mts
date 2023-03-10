import { add, multiplyRef } from '@ts-test/lib-main'
import shared from '@ts-test/lib-shared'

export const main = (args?: string[]) => {
	console.log(`args: ${args?.join(',')}`)
	console.log(`add 2+3: ${add(2,3)}`)
	console.log(`divide 2/3: ${shared.divide(2,3)}`)
	console.log(`multiply 2*3: ${shared.multiply(2,3)}`)
	console.log(`multiplyRef 2*3: ${multiplyRef(2,3)}`)
}

const args = process.argv.length > 2 ? process.argv.slice(2) : []
main(args)