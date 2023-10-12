import { multiply } from '@potatoes/lib-shared'

export const Thing2 = () => {
	return (
		<p>
			Thing: <code data-testid="value">{multiply(2, 3)}</code> should be six.
		</p>
	)
}
