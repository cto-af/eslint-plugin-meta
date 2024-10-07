/**
 * @fileoverview Ensure all rules are valid
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
function checkRulesKnown(context, rules, node) {
  for (const p of node.properties) {
    const key = p.key?.name || p.key?.value;
    if (!key) {
      continue;
    }
    const kr = rules[key];
    if (!kr) {
      const match = key.match(/^(?<prefix>[^/]+)\//);
      if (match) {
        context.report({
          messageId: 'unknownPrefix',
          node: p.key,
          data: {key, prefix: match.groups.prefix},
        });
      } else {
        context.report({
          messageId: 'unknown',
          node: p.key,
          data: {key},
        });
      }
    }
  }
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure all rules are valid',
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      unknown: 'Unknown rule "{{ key }}".',
      unknownPrefix: 'Unknown rule "{{ key }}".  Add "{{ prefix }}" to settings?',
    },
  },

  create(context) {
    const settings = getSettings(context);
    const rules = Object.assign({}, ...Object.values(settings));

    return {
      [RULES_EXPORT]: node => checkRulesKnown(context, rules, node),
      [RULES_KEY]: node => checkRulesKnown(context, rules, node),
    };
  },
};
