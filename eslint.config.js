import es6 from '@cto.af/eslint-config/es6.js';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
import meta from './lib/index.js';
import mocha from '@cto.af/eslint-config/mocha.js';
import stylistic from '@stylistic/eslint-plugin';

/* eslint meta/no-unused-rules: ["error", {ignore: ["@stylistic"]}] */

const settings = {
  meta: {
    libs: {
      '@stylistic': stylistic,
    },
  },
};

export default [
  ...es6,
  ...mocha,
  eslintPlugin.configs['flat/recommended'],
  {
    files: [
      '**/*.js',
    ],
    rules: {
      // [stylistic](https://eslint.style/packages/default)
      '@stylistic/spaced-comment': [
        'error',
        'always',
        {
          exceptions: ['--'],
        },
      ],
    },
  },
  {
    files: [
      'eslint.config.js',
    ],
    ...meta.configs.recommended,
    settings,
  },
];
