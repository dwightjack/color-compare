import { styled } from '../../styled-system/jsx';

export const Button = styled('button', {
	base: {
		cursor: 'pointer',
		transition: 'colors',
		transitionDuration: 'fast',
	},
	variants: {
		variant: {
			primary: {
				bg: 'blue.500',
				color: 'white',
				_hover: { bg: 'blue.600' },
				_focusVisible: {
					outlineColor: 'blue.500',
				},
				_osDark: {
					color: 'zinc.800',
				},
			},
			contrast: {
				bg: 'zinc.100',
				color: 'zinc.900',
				opacity: 0.7,
				_hover: { bg: 'zinc.300' },
			},
			transparent: {
				bg: 'transparent',
				color: 'current',
				_focusVisible: {
					outlineColor: 'currentcolor',
				},
			},
		},
		shape: {
			fluid: {
				py: '2',
				px: '4',
				rounded: 'md',
			},
			circle: {
				aspectRatio: 'square',
				borderRadius: 'full',
				display: 'grid',
				placeItems: 'center',
				flexShrink: 0,
			},
			square: {
				aspectRatio: 'square',
				display: 'grid',
				placeItems: 'center',
				flexShrink: 0,
			},
		},
	},
	defaultVariants: {
		variant: 'primary',
		shape: 'fluid',
	},
});
