/**
 * @fileoverview Ensure no deprecated rules are used
 * @author Joe Hildebrand
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import {RuleTester} from 'eslint';
import rule from '../../lib/rules/no-deprecated-rules.js';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('no-deprecated-rules', rule, {
  valid: [
    {
      code: `export default {
rules: {
  'constructor-super': 'error',
}}`,
    },
    {
      code: `export default {
rules: {
  'plugin/fixer-return': 'off', // plugin not in settings
}}`,
      // No settings!
    },
  ],

  invalid: [
    {
      code: `export default {
rules: {
  'array-bracket-newline': 'off',
}}`,
      errors: [{messageId: 'deprecated', type: 'Literal'}],
    },
  ],
});
