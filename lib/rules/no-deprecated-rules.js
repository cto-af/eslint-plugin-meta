/**
 * @fileoverview Ensure no deprecated rules are used
 * @author Joe Hildebrand
 */

import {RULES_EXPORT, RULES_KEY, getSettings} from '../settings.js';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {import('../settings.js').ModuleRules} rules
 * @param {import('eslint').Rule.Node} node
 */
function checkDeprecated(context, rules, node) {
  for (const p of node.properties) {
    const key = p.key?.name || p.key?.value;
    if (!key) {
      continue;
    }
    const kr = rules[key];
    if (kr?.meta?.deprecated) {
      context.report({
        messageId: 'deprecated',
        node: p.key,
        data: {key},
      });
    }
  }
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure no deprecated rules are used',
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      deprecated: 'Rule "{{ key }}" is deprecated.',
    },
  },

  create(context) {
    const settings = getSettings(context);
    const rules = Object.assign({}, ...Object.values(settings));

    return {
      [RULES_EXPORT]: node => checkDeprecated(context, rules, node),
      [RULES_KEY]: node => checkDeprecated(context, rules, node),
    };
  },
};
