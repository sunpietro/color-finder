const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const globals = require('globals');

module.exports = [
  { ignores: ['node_modules/**', 'dist/**'] },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      eqeqeq: ['error', 'always'],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'eol-last': ['error', 'always'],
      'no-unused-vars': 'off',
      'prettier/prettier': 'error',
      'sort-imports': 0,
      'simple-import-sort/imports': 'error',
      'linebreak-style': ['error', 'unix'],
      '@typescript-eslint/explicit-function-return-type': ['error'],
      '@typescript-eslint/no-unused-vars': ['error'],
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
    },
  },
];
