/**
 * @fileoverview Ensure all rules are valid
 * @author Joe Hildebrand
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Eplugin from 'eslint-plugin-eslint-plugin';
import {RuleTester} from 'eslint';
import rule from '../../lib/rules/no-unknown-rules.js';

// Avoid freezeDeeply issue
const plugin = {
  rules: Eplugin.rules,
};

const settings = {
  meta: {
    libs: {plugin},
  },
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('no-unknown-rules', rule, {
  valid: [
    {
      code: `export default {
rules: {
  'plugin/fixer-return': 'error',
}}`,
      settings,
    },
  ],

  invalid: [
    {
      code: `export default {
rules: {
  'bad-unknown-bad': 'error',
}}`,
      errors: [{messageId: 'unknown', type: 'Literal'}],
    },
    {
      code: `export default {
rules: {
  'foo/bad-unknown-bad': 'error',
}}`,
      errors: [{messageId: 'unknownPrefix', type: 'Literal'}],
    },
  ],
});
