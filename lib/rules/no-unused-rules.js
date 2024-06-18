/**
 * @fileoverview Ensure all non-deprecated rules are used
 * @author Joe Hildebrand
 */
import {getSettings} from '../settings.js';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure all non-deprecated rules are used",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null,
    schema: [
      // Add schema for ignored libs
    ],
    messages: {
      unknownPrefix: 'Unknown rule "{{ key }}".  Add "{{ prefix }}" to settings?',
      unused: '{{ key }} unused, see: {{ url }}'
    },
  },

  create(context) {
    const settings = getSettings(context);
    const rules = Object.assign({}, ...Object.values(settings));

    return {
      'ObjectExpression[parent.key.name="rules"]': node => {
        const prefixes = new Set();
        const possibleRules = new Set();
        for (const p of node.properties) {
          const key = p.key.name || p.key.value;
          const match = key.match(/^([^/]+)\//);
          const prefix = match ? match[1] : '@';
          if (!prefixes.has(prefix)) {
            // If we use one rule from a library, make sure we've
            // used all the rules
            prefixes.add(prefix);
            if (!settings[prefix]) {
              context.report({
                messageId: 'unknownPrefix',
                node,
                data: {
                  key,
                  prefix,
                },
              });
              continue;
            }
            for (const [name, value] of Object.entries(settings[prefix])) {
              if (!value.meta?.deprecated) {
                possibleRules.add(name);
              }
            }
          }
          possibleRules.delete(key);
        }
        for (const key of possibleRules) {
          context.report({
            messageId: 'unused',
            node,
            data: {
              key,
              url: rules[key]?.meta?.docs?.url
            },
          });
        }
      }
    };
  },
};
