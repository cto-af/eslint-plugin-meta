/**
 * @fileoverview Ensure all rules are valid
 * @author Joe Hildebrand
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import en from "eslint-plugin-n";
import rule from "../../lib/rules/no-unknown-rules.js";
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
ruleTester.run("no-unknown-rules", rule, {
  valid: [
    {
      code: `export default {
rules: {
  'n/handle-callback-err': 'error',
}}`,
      settings,
    }
  ],

  invalid: [
    {
      code: `export default {
rules: {
  'bad-unknown-bad': 'error',
}}`,
      errors: [{ messageId: "unknown", type: "Literal" }],
    },
    {
      code: `export default {
rules: {
  'foo/bad-unknown-bad': 'error',
}}`,
      errors: [{ messageId: "unknownPrefix", type: "Literal" }],
    },
  ],
});
