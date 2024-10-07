/**
 * @fileoverview Ensure all non-deprecated rules are used
 * @author Joe Hildebrand
 */
import {RULES_EXPORT, RULES_KEY, getSettings} from '../settings.js';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @param {import('eslint').Rule.RuleContext} context
* @param {import('../settings.js').ModuleMap} settings
 * @param {import('../settings.js').ModuleRules} rules
 * @param {import('eslint').Rule.Node} node
 */
function findUnused(context, settings, rules, node) {
  const prefixes = new Set();
  const possibleRules = new Set();

  for (const i of (context.options?.[0]?.ignore ?? [])) {
    prefixes.add(i);
  }
  for (const p of node.properties) {
    const key = p.key?.name || p.key?.value;
    if (!key) {
      continue;
    }
    const match = key.match(/^(?<prefix>[^/]+)\//);
    const prefix = match ? match.groups.prefix : '@';
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
        url: rules[key]?.meta?.docs?.url,
      },
    });
  }
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure all non-deprecated rules are used',
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          ignore: {
            type: 'array',
            items: {
              type: 'string',
            },
            maxItems: Infinity,
            default: [],
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      unknownPrefix: 'Unknown rule "{{ key }}".  Add "{{ prefix }}" to settings?',
      unused: '{{ key }} unused, see: {{ url }}',
    },
  },

  create(context) {
    const settings = getSettings(context);
    const rules = Object.assign({}, ...Object.values(settings));

    return {
      [RULES_EXPORT]: node => findUnused(context, settings, rules, node),
      [RULES_KEY]: node => findUnused(context, settings, rules, node),
    };
  },
};
