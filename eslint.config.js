import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

// Flat config (ESLint 9). JSX lives in .js files (CRA legacy), so every
// source file is treated as JSX-capable.
export default [
    { ignores: ['dist/**', 'coverage/**'] },

    // Surface eslint-disable directives that no longer suppress anything.
    { linterOptions: { reportUnusedDisableDirectives: 'warn' } },

    js.configs.recommended,
    react.configs.flat.recommended,
    jsxA11y.flatConfigs.recommended,

    { settings: { react: { version: 'detect' } } },

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
            // No prop-types / TypeScript in this project by design.
            'react/prop-types': 'off',
            // Pre-existing violations demoted to warnings so the gate is green
            // on adoption; each is tracked in AUDIT.md and promoted back to
            // error when its dedicated fix lands.
            'react-hooks/set-state-in-effect': 'warn',
            'jsx-a11y/click-events-have-key-events': 'warn',
            'jsx-a11y/no-static-element-interactions': 'warn',
        },
    },

    // Node context for config files.
    {
        files: ['**/*.config.{js,mjs}'],
        languageOptions: { globals: { ...globals.node } },
    },

    // Test files run under Vitest (globals enabled in vite.config.mjs).
    {
        files: ['**/*.test.{js,jsx}', '**/setupTests.js'],
        languageOptions: { globals: { ...globals.browser, ...globals.vitest } },
    },
];
