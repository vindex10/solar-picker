import config from "eslint-config-prettier";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
	...[
		{
			rules: {
				"no-unused-vars": "error",
				"no-undef": "error",
			},
			languageOptions: {
				globals: {
					...globals.browser,
				},
			},
		},
	].concat(config),
];
