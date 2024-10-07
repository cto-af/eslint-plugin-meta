import {builtinRules} from 'eslint/use-at-your-own-risk';

export const RULES_EXPORT = 'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator[id.name="rules"] > ObjectExpression.init';
export const RULES_KEY = 'ObjectExpression[parent.key.name="rules"]';

/**
 * @typedef {Record<string, import('eslint').Rule.RuleModule>} ModuleRules
 */

/**
 * @typedef {Record<string, ModuleRules>} ModuleMap
 */

function rename(rules, prefix) {
  if (!rules || typeof rules !== 'object') {
    throw new TypeError(`Invalid rules for prefix "${prefix}": ${rules}`);
  }
  return Object.fromEntries(
    Object.entries(rules).map(([k, v]) => [`${prefix}/${k}`, v])
  );
}

/**
 * @type ModuleMap
 */
const rulesByLib = Object.create(null, {
  '@': {
    value: Object.fromEntries(builtinRules.entries()),
    writable: false,
    configurable: false,
    enumerable: true,
  },
});

/**
 * @param {import('eslint').Rule.RuleContext} context
 * @returns {ModuleMap}
 */
export function getSettings(context) {
  const libs = context?.settings?.meta?.libs ?? {};
  for (const [k, v] of Object.entries(libs)) {
    if (!rulesByLib[k]) {
      rulesByLib[k] = rename(v.rules, k);
    }
  }
  return rulesByLib;
}
