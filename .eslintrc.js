const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8")
);

module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  plugins: ["prettier"],
  extends: ["airbnb-typescript", "react-app", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    "react/react-in-jsx-scope": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "prettier/prettier": ["error", prettierOptions],
  },
};
