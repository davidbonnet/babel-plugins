module.exports = {
  plugins: ['import'],
  extends: ['eslint:recommended', 'plugin:import/errors', 'prettier'],
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
  },
  globals: {
    __dirname: true,
    __filename: true,
    console: true,
    global: true,
    import: true,
    module: true,
    process: true,
    require: true,
    window: true,
  },
  rules: {
    curly: 'error',
    'default-case': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
      },
    ],
    'line-comment-position': [
      'error',
      {
        position: 'above',
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-irregular-whitespace': [
      'error',
      {
        skipStrings: true,
        skipTemplates: true,
      },
    ],
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'no-var': 'error',
    'prefer-const': 'error',
  },
  overrides: [
    {
      files: ['fixtures/*.js'],
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
      },
    },
  ],
}
