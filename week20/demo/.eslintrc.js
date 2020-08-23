module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
    "plugin:react/recommended"
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  // 一般不动rules 需要团队讨论的
  rules: {
    "semi": "error",
    "no-unused-vars": "error"
    // "no-unused-vars": "off"
  },
  settings: {
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
                                         // default to "createReactClass"
      "pragma": "React ",  // Pragma to use, default to "React"
      "version": "detect", // React version. "detect" automatically picks the version you have installed.
                           // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                           // default to latest and warns if missing
                           // It will default to "detect" in the future
      "flowVersion": "0.53" // Flow version
    }
  }
};
