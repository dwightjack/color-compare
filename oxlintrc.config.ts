import solidV2 from 'eslint-plugin-solid/configs/v2';
import { defineConfig } from 'oxlint';

export default defineConfig({
	plugins: ['typescript', 'unicorn', 'oxc'],
	jsPlugins: ['eslint-plugin-solid'],
	settings: solidV2.settings,
	categories: {
		correctness: 'error',
	},
	options: {
		typeAware: true,
		typeCheck: true,
	},
	rules: {
		...solidV2.rules,
		'consistent-type-imports': 'warn',
		'no-duplicate-imports': 'warn',
		'consistent-type-specifier-style': 'warn',
	},

	ignorePatterns: ['styled-system/**', 'dist/**'],
});
