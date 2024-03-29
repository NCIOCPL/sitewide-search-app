module.exports = {
	extends: '@nciocpl/esling-config-react',
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended',
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2016,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	// Plugins are configured by the recommended extensions above
	rules: {
		'react/display-name': 'off',
		'react-hooks/exhaustive-deps': 'off',
	},
	globals: {
		cy: true,
		Cypress: true,
		getFixture: true,
	},
};
