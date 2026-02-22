/**
 * @fileoverview Ensure all non-deprecated rules are used
 * @author Joe Hildebrand
 */
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import {RuleTester} from 'eslint';
import meta from '../../lib/index.js';
import rule from '../../lib/rules/no-unused-rules.js';

const settings = {
  meta: {
    libs: {meta: {rules: meta.rules}},
  },
};

const deprecated_url = 'https://github.com/cto-af/eslint-plugin-meta/blob/main/docs/rules/no-deprecated-rules.md'
const unknown_url = 'https://github.com/cto-af/eslint-plugin-meta/blob/main/docs/rules/no-unknown-rules.md';
const sort_url = 'https://github.com/cto-af/eslint-plugin-meta/blob/main/docs/rules/sort-rules.md';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('no-unused-rules', rule, {
  valid: [
    {
      code: `export const rules = {
  'constructor-super': 'error',
}`,
      options: [{
        ignore: ['@'],
      }],
    },
    {
      code: `export default {
rules: {
  'constructor-super': 'error',
}}`,
      options: [{
        ignore: ['@'],
      }],
    },
    {
      code: `
const ignored = { ignored: 'error' };
export default {
rules: {
  ...ignored,
}}`,
    },
  ],

  invalid: [
    {
      code: `export default {
rules: {
  'meta/no-unused-rules': 'error',
}}`,
      errors: [{messageId: 'unknownPrefix', data: {
        key: 'meta/no-unused-rules',
        prefix: 'meta',
      }}],
      // No settings
    },
    {
      code: `export default {
rules: {
  'meta/no-unused-rules': 'error',
}}`,
      errors: [
        {messageId: 'unused', data: {
          key: 'meta/no-deprecated-rules',
          url: deprecated_url,
        }},
        {messageId: 'unused', data: {
          key: 'meta/no-unknown-rules',
          url: unknown_url,
        }},
        {messageId: 'unused', data: {
          key: 'meta/sort-rules',
          url: sort_url,
        }},
      ],
      settings,
    },
    {
      code: `export const rules = {
  'meta/no-unused-rules': 'error',
}`,
      errors: [
        {messageId: 'unused', data: {
          key: 'meta/no-deprecated-rules',
          url: deprecated_url,
        }},
        {messageId: 'unused', data: {
          key: 'meta/no-unknown-rules',
          url: unknown_url,
        }},
        {messageId: 'unused', data: {
          key: 'meta/sort-rules',
          url: sort_url,
        }},
      ],
      settings,
    },
  ],
});
