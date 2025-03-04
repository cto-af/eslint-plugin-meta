/**
 * @fileoverview Ensure eslint all rules are sorted, not deprecated,
 *   and included
 * @author Joe Hildebrand
 */

import fs from 'node:fs/promises';

const rulesDir = await fs.readdir(new URL('./rules/', import.meta.url));
const rules = {};
for (const r of rulesDir) {
  rules[r.replace(/\.js$/, '')] =
    (await import(new URL(`./rules/${r}`, import.meta.url))).default;
}

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const meta = {
  rules,
  configs: {},
};

meta.configs = {
  recommended: {
    plugins: {meta},
    rules: Object.fromEntries(
      Object
        .entries(rules)
        .filter(([, v]) => v.meta.docs.recommended)
        .map(([k]) => [`meta/${k}`, 'error'])
    ),
  },
  all: {
    plugins: {meta},
    rules: Object.fromEntries(
      Object
        .entries(rules)
        .map(([k]) => [`meta/${k}`, 'error'])
    ),
  },
};

export default meta;
