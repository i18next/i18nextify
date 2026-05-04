import neostandard from 'neostandard'
import globals from 'globals'

export default [
  {
    ignores: [
      'dist',
      'node_modules',
      'example',
      'i18nextify.js',
      'i18nextify.min.js',
    ],
  },
  ...neostandard(),
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: { ...globals.jest, ...globals.browser, vi: 'readonly' },
    },
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  {
    rules: {
      '@stylistic/comma-dangle': 'off',
      '@stylistic/space-before-function-paren': 'off',
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }],
    },
  },
]
