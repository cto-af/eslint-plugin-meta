/**
 * @fileoverview Ensure eslint rules are sorted
 * @author Joe Hildebrand
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import {RuleTester} from 'eslint';
import rule from '../../lib/rules/sort-rules.js';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const settings = {};

const ruleTester = new RuleTester();
ruleTester.run('sort-rules', rule, {
  valid: [
    {
      code: `export default {
  rules: {
    // [Possible Problems](https://eslint.org/docs/rules/#possible-problems)
    'array-callback-return': ['error', {allowImplicit: true}],
    'constructor-super': 'error',
  }}`,
    },
  ],

  invalid: [
    {
      code: `export default {
rules: {
  'array-callback-return': ['error', {allowImplicit: true}],
}}`,
      errors: [{messageId: 'beforeAny', type: 'Literal'}],
      settings,
    },
    {
      code: `export default {
rules: {
  // [Possible Problems](https://eslint.org/docs/rules/#possible-problems)
  'constructor-super': 'error',
  'array-callback-return': ['error', {allowImplicit: true}],
}}`,
      errors: [{messageId: 'outOfOrder', type: 'Literal'}],
      settings,
    },
  ],
});
