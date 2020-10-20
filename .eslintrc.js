module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'max-len': [2, 150, 2],
  },
  plugins: ['jest'],
};
