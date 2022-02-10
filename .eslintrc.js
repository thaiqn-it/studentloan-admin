module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["react-app"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
  plugins: ["react", "only-warn"],
};
