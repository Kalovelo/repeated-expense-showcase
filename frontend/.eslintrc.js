module.exports = {
  "extends": ["plugin:@typescript-eslint/recommended", "react-app", "plugin:prettier/recommended"],
  "plugins": ["react", "@typescript-eslint/eslint-plugin"],
  "env": {
    "browser": true,
    "es6": true,
    "jest": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  ignorePatterns: ['.eslintrc.js'],
  "rules": {
    "max-len": ["error", { "code": 150, "tabWidth": 2, "ignoreStrings": true }],
    "linebreak-style": "off",
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
  }
}
