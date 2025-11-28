import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import process from 'process';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{js,jsx}'],
        extends: [
            js.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        rules: {
            'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
            'no-console':
                process.env.NODE_ENV === 'production' ? 'error' : 'warn',
            'no-undef': 'error',
            'no-trailing-spaces': 'error',
            'no-debugger':
                process.env.NODE_ENV === 'production' ? 'error' : 'warn',
            eqeqeq: ['error', 'always'],
            curly: ['error', 'all'],
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            indent: ['error', 4, { SwitchCase: 1 }],
            'comma-dangle': ['error', 'always-multiline'],
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            'object-curly-spacing': ['error', 'always'],
            'prefer-const': 'error',
            'prefer-arrow-callback': 'error',
            'arrow-spacing': ['error', { before: true, after: true }],
            'no-var': 'error',
            'no-fallthrough': 'error',
            'no-unreachable': 'error',
            'no-extra-bind': 'error',
            'no-empty-function': 'warn',
        },
    },
]);
