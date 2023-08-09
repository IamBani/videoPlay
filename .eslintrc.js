module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb', '@vue/typescript/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: [0],
    'import/no-extraneous-dependencies': 'off',
    'no-restricted-syntax': 'off',
    'linebreak-style': 'off',
    'object-curly-newline': 'off',
    'import/no-unresolved': 'off',
    'max-len': ['error', { code: 300 }],
    indent: 'off',
    'func-call-spacing': 'off',
    'no-spaced-func': 'off',
    'no-param-reassign': 'off',
    'class-methods-use-this': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}
