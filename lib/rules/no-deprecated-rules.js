/**
 * @fileoverview Ensure no deprecated rules are used
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
      'ObjectExpression[parent.key.name="rules"]': node => {
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
      },
    };
  },
};
