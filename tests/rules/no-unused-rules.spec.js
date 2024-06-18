/**
 * @fileoverview Ensure all non-deprecated rules are used
 * @author Joe Hildebrand
 */
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import meta from "../../lib/index.js";
import rule from "../../lib/rules/no-unused-rules.js";
import {RuleTester} from "eslint";

const settings = {
  meta: {
    libs: { meta: { rules: meta.rules } },
  },
};


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-unused-rules", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: `export default {
rules: {
  'meta/no-unused-rules': 'error',
}}`,
      errors: [{ messageId: "unknownPrefix", type: "ObjectExpression" }],
      // No settings
    },
    {
      code: `export default {
rules: {
  'meta/no-unused-rules': 'error',
}}`,
      errors: [
        { messageId: "unused", type: "ObjectExpression" },
        { messageId: "unused", type: "ObjectExpression" },
        { messageId: "unused", type: "ObjectExpression" },
      ],
      settings,
    },
  ],
});
