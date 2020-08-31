module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    // Allows for the parsing of modern ECMAScript features
    ecmaVersion: 2018,
    // Allows for the use of imports
    sourceType: 'module',
    ecmaFeatures: {},
  },
  rules: {
    eqeqeq: ['error', 'always'],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'eol-last': ['error', 'always'],
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'prettier/prettier': 'error',
    'sort-imports': 0,
    'simple-import-sort/sort': 'error',
    'react/prop-types': 0,
    'linebreak-style': ['error', 'unix'],
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  ignorePatterns: ['node_modules'],
  settings: {},
  plugins: ['prettier', '@typescript-eslint', 'simple-import-sort'],
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
      },
    },
  ],
};
