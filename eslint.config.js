import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

// Flat config (ESLint 9). The codebase is migrating from JS to TypeScript, so
// both .js/.jsx and .ts/.tsx source files are supported here.
export default [
    { ignores: ['dist/**', 'coverage/**'] },

    // Surface eslint-disable directives that no longer suppress anything.
    { linterOptions: { reportUnusedDisableDirectives: 'warn' } },

    js.configs.recommended,
    react.configs.flat.recommended,
    jsxA11y.flatConfigs.recommended,

    { settings: { react: { version: 'detect' } } },

    // JS/JSX: espree parser, classic JSX runtime (these files still import React).
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parserOptions: { ecmaFeatures: { jsx: true } },
            globals: { ...globals.browser },
        },
        // react-hooks 7.x still ships an eslintrc-style config, so register the
        // plugin explicitly and pull in its recommended rules.
        plugins: { 'react-hooks': reactHooks },
        rules: {
            ...reactHooks.configs['recommended-latest'].rules,
            'react/prop-types': 'off',
        },
    },

    // TS/TSX: typescript-eslint parser + rules.
    ...tseslint.configs.recommended.map((config) => ({
        ...config,
        files: ['**/*.{ts,tsx}'],
    })),
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: { globals: { ...globals.browser } },
        plugins: { 'react-hooks': reactHooks },
        rules: {
            ...reactHooks.configs['recommended-latest'].rules,
            // Automatic JSX runtime — React need not be in scope.
            ...react.configs.flat['jsx-runtime'].rules,
            'react/prop-types': 'off',
        },
    },

    // Node context for config files.
    {
        files: ['**/*.config.{js,mjs}'],
        languageOptions: { globals: { ...globals.node } },
    },

    // Test files run under Vitest (globals enabled in vite.config.mjs).
    {
        files: ['**/*.test.{js,jsx,ts,tsx}', '**/setupTests.{js,ts}'],
        languageOptions: { globals: { ...globals.browser, ...globals.vitest } },
    },

    // Turn off ESLint rules that would conflict with Prettier. Must stay last.
    prettier,
];
