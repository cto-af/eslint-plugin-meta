/**
 * @fileoverview Ensure no deprecated rules are used
 * @author Joe Hildebrand
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import en from "eslint-plugin-n";
import rule from "../../lib/rules/no-deprecated-rules.js";
import {RuleTester} from "eslint";

// Avoid freezeDeeply issue
const n = {
  rules: en.rules,
};

const settings = {
  meta: {
    libs: { n }
  },
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-deprecated-rules", rule, {
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
  'n/shebang': 'off', // n not in settings
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
      errors: [{ messageId: "deprecated", type: "Literal" }],
    },
    {
      code: `export default {
rules: {
  'n/shebang': 'off',
}}`,
      errors: [{ messageId: "deprecated", type: "Literal" }],
      settings,
    },
  ],
});
