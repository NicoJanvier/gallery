const js = require('@eslint/js');
const typescript = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const reactHooks = require('eslint-plugin-react-hooks');
const globals = require('globals');

module.exports = [
    js.configs.recommended,
    {
        ignores: ['dist/*', 'node_modules/*'],
        languageOptions: {
            globals: {
                ...globals.browser
            },
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        },
        plugins: {
            '@typescript-eslint': typescript,
            'react-hooks': reactHooks
        },
        rules: {
            ...typescript.configs.recommended.rules,
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn'
        }
    }
];
