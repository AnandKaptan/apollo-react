module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    document: false,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'prettier/prettier': 'error',
  },
};
