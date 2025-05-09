import js from "@eslint/js"
import globals from "globals"
import jsdoc from "eslint-plugin-jsdoc"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import vitest from "@vitest/eslint-plugin"
import reactRefresh from "eslint-plugin-react-refresh"
import eslintConfigPrettier from "eslint-config-prettier"

export default [
  jsdoc.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    ignores: ["dist", "node_modules", ".eslint.config.mjs", "vite.config.js"],
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...vitest.environments.env.globals,
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: { version: "18.3" },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      jsdoc: jsdoc,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": "off",
      "react/jsx-no-target-blank": "off",
      "jsdoc/require-param-description": "off",
      "jsdoc/require-returns-description": "off",
      "jsdoc/require-returns-declaration": "off",
      "jsdoc/require-returns": "off",
      "react/prop-types": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
]
