import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    // Configuration for client-side files
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    // Configuration for server-side files
    files: ['server.js'], // Adjust the pattern to match your server files
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node, // Use Node.js globals
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script', // CommonJS typically uses script type
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  {
    // Configuration for Node.js config files
    files: ['postcss.config.js'], // Add any other config files here
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node, // Use Node.js globals
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script', // CommonJS typically uses script type
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
