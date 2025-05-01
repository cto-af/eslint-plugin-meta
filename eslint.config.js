import eslintPlugin from 'eslint-plugin-eslint-plugin';
import globals from "globals";
import meta from './lib/index.js';
import mochaPlugin from "eslint-plugin-mocha";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: {
    globals: globals.node,
  }},
  pluginJs.configs.recommended,
  {
    files: [
      'eslint.config.js',
    ],
    ...meta.configs.recommended,
  },
  mochaPlugin.configs.recommended,
  eslintPlugin.configs['flat/recommended'],
];
