import eslint from "@eslint/js"
import configPrettier from "eslint-config-prettier"
import pluginAstro from "eslint-plugin-astro"
import pluginPrettier from "eslint-plugin-prettier"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig(
  globalIgnores([
    "dist/**",
    ".astro/**",
    "node_modules/**",
    "package-lock.json",
    "scripts/**",
    "starter/**",
    "eslint.config.mjs"
  ]),

  {
    files: ["**/*.{mjs,cjs}"],
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
  ...pluginAstro.configs.recommended,
  configPrettier,

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,astro}"],

    plugins: {
      prettier: pluginPrettier
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },

    rules: {
      // Prettier rules
      "prettier/prettier": ["error", { endOfLine: "auto" }],

      // TypeScript & General rules
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-prototype-builtins": "off",
      "prefer-spread": "off",
      "no-useless-escape": "off",
      "no-unsafe-optional-chaining": "error",
      "no-self-assign": "off"
    }
  }
)
