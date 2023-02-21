import { add } from '@ts-test/lib-main'
import { divide } from '@ts-test/lib-shared'

export const main = (args?: string[]) => {
	console.log(`args: ${args?.join(',')}`)
	console.log(`add: ${add(2,3)}`)
	console.log(`add: ${divide(2,3)}`)
}

main()