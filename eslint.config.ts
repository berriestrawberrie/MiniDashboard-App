import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{,mjs,cjs,ts,mts,cts}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.node } },
    tseslint.configs.recommended,
    {
      "rules": {
        "@typescript-eslint/no-unused-vars": "warn"
      }
    },
      {
    ignores: [
      'index.js',     // Ignore specific file typescript compiled by tsc index.ts
    ],
  },
]);
