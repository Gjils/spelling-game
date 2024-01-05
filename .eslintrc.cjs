module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	settings: { react: { version: "18.2" } },
	plugins: ["react-refresh"],
	rules: {
		"no-unused-vars": ["warn"],
		"react/prop-types": [0],
		"react/react-in-jsx-scope": "off",
		"react/jsx-uses-react": "off",
		"linebreak-style": ["off", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};
