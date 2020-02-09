module.exports = {
  parser: 'babel-eslint',
  plugins: ['babel'],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
  ],
  settings: {
    propWrapperFunctions: [
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' },
    ],
  },
  rules: {
    'import/prefer-default-export': 0,
    'linebreak-style': 0,
    'line-break-style': 0,
    'no-console': 0,
    'max-len': ['warn', { code: 120 }],
    'operator-linebreak': ['error', 'after'],
    'no-continue': 0,
  },
};
