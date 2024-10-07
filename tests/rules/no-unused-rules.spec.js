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
      errors: [{messageId: 'unknownPrefix', type: 'ObjectExpression'}],
      // No settings
    },
    {
      code: `export default {
rules: {
  'meta/no-unused-rules': 'error',
}}`,
      errors: [
        {messageId: 'unused', type: 'ObjectExpression'},
        {messageId: 'unused', type: 'ObjectExpression'},
        {messageId: 'unused', type: 'ObjectExpression'},
      ],
      settings,
    },
    {
      code: `export const rules = {
  'meta/no-unused-rules': 'error',
}`,
      errors: [
        {messageId: 'unused', type: 'ObjectExpression'},
        {messageId: 'unused', type: 'ObjectExpression'},
        {messageId: 'unused', type: 'ObjectExpression'},
      ],
      settings,
    },
  ],
});
