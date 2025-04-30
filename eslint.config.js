import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'

export default tseslint.config(
	{
		ignores: [
			'dist',
			'node_modules',
			'*.config.js',
			'*.config.ts',
			'.eslintrc.js',
		],
	},
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			...tseslint.configs.stylistic,
			reactRecommended,
		],
		files: ['**/*.{ts,tsx,js,jsx}'],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.es2021,
				React: true,
				JSX: true,
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				project: true,
			},
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			jsdoc: jsdoc,
		},
		rules: {
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/jsx-key': 'error',
			'react/jsx-no-target-blank': 'error',

			// React Hooks
			...reactHooks.configs.recommended.rules,
			'react-hooks/exhaustive-deps': 'warn',

			// React Refresh
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],

			// TypeScript
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],

			// Стилистика
			quotes: ['error', 'single'],
			semi: ['error', 'never'],
			indent: ['error', 2],
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	}
)
