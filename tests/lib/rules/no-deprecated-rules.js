/**
 * @fileoverview Ensure no deprecated rules are used
 * @author Joe Hildebrand
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-deprecated-rules"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-deprecated-rules", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "{ \"some-deprecated-rule\": \"error }\"",
      errors: [{ messageId: "Fill me in.", type: "Me too" }],
    },
  ],
});
