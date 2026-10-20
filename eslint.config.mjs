import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["js/**/*.js"],
    languageOptions: { ecmaVersion: 2022, sourceType: "script", globals: globals.browser },
    rules: {
      eqeqeq: "error",
      "no-var": "warn",
      "prefer-const": "warn",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-console": "warn",
    },
  },
];
