module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
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
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "default",
        format: [
          "camelCase",
          "strictCamelCase",
          "PascalCase",
          "StrictPascalCase",
          "snake_case",
          "UPPER_CASE",
        ],
        leadingUnderscore: "allow",
        trailingUnderscore: "allow",
      },
    ],
  },
};
