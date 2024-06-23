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

const plugin = {
  rules,
  configs: {},
};

Object.fromEntries(
  Object
    .entries(rules)
    .filter(([_k, v]) => v.meta.docs.recommended)
    .map(([k, _v]) => [`meta/${k}`, 'error'])
);

plugin.configs = {
  recommended: {
    plugins: {
      meta: plugin,
    },
    rules: Object.fromEntries(
      Object
        .entries(rules)
        .filter(([_k, v]) => v.meta.docs.recommended)
        .map(([k, _v]) => [`meta/${k}`, 'error'])
    ),
  },
  all: {
    plugins: {
      meta: plugin,
    },
    rules: Object.fromEntries(
      Object
        .entries(rules)
        .map(([k, _v]) => [`meta/${k}`, 'error'])
    ),
  },
};

export default plugin;
