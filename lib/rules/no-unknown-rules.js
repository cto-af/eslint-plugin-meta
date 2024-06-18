/**
 * @fileoverview Ensure all rules are valid
 * @author Joe Hildebrand
 */
import {getSettings} from '../settings.js';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: "Ensure all rules are valid",
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
      'ObjectExpression[parent.key.name="rules"]': node => {
        for (const p of node.properties) {
          const key = p.key.name || p.key.value;
          const kr = rules[key];
          if (!kr) {
            const match = key.match(/^([^/]+)\//);
            if (match) {
              context.report({
                messageId: 'unknownPrefix',
                node: p.key,
                data: { key, prefix: match[1] },
              });
            } else {
              context.report({
                messageId: 'unknown',
                node: p.key,
                data: { key },
              });
            }
          }
        }
      }
    };
  },
};
