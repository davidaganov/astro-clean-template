import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginAstro from "eslint-plugin-astro"
import eslintPluginPrettier from "eslint-plugin-prettier"
import { defineConfig } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig(
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      "package-lock.json",
      "scripts/**",
      "starter/**"
    ]
  },

  {
    files: ["**/*.{mjs,cjs}", "eslint.config.mjs"],
    languageOptions: {
      globals: globals.nodeBuiltin
    }
  },

  {
    files: ["src/assets/script/**/*.js"],
    languageOptions: {
      globals: globals.browser
    }
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,astro}"],
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }]
    }
  },

  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ]
    }
  }
)
