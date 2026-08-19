import { defineConfig } from '@pandacss/dev';

import { overflowEllipsis } from './panda-recipes/text';

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ['./src/**/*.{js,jsx,ts,tsx}'],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			recipes: {
				overflowEllipsis,
			},
		},
	},

	jsxFramework: 'solid',

	// The output directory for your css system
	outdir: 'styled-system',

	lightningcss: true,
});
