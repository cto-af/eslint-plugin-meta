/**
 * @fileoverview Ensure eslint all rules are sorted, not deprecated, and included
 * @author Joe Hildebrand
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import noDeprecatedRules from "./rules/no-deprecated-rules.js";
import noUnknownRules from "./rules/no-unknown-rules.js";
import noUnusedRules from "./rules/no-unused-rules.js";
import sortRules from "./rules/sort-rules.js";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
const rules = {
  'no-deprecated-rules': noDeprecatedRules,
  'no-unknown-rules': noUnknownRules,
  'no-unused-rules': noUnusedRules,
  'sort-rules': sortRules,
}

const plugin = {
  rules,
}

plugin.configs = {
  recommended: {
    name: 'meta/recommended',
    plugins: {
      meta: plugin,
    },
    rules
  }
}

export default plugin;