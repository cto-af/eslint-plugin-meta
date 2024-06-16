/**
 * @fileoverview Ensure all rules are valid
 * @author Joe Hildebrand
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-unknown-rules"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-unknown-rules", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "{ \"invalid-rule\": \"error\" }",
      errors: [{ messageId: "Fill me in.", type: "Me too" }],
    },
  ],
});
