/**
 * @fileoverview Ensure eslint rules are sorted
 * @author Joe Hildebrand
 */

import {RULES_EXPORT, RULES_KEY} from '../settings.js';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {import('eslint').SourceCode} src
 * @param {import('eslint').Rule.Node} node
 */
function checkRulesSorted(context, src, node) {
  const comments = src.getCommentsInside(node);
  const lines = comments.reduce((t, c) => {
    const match = c.value.match(/\[(?<title>[^\]\r\n]+)/);
    // Avoid potential ReDOS by checking for closing ']' by hand.
    if (match && (c.value[match.index + match[0].length] === ']')) {
      t.push({
        name: match.groups.title,
        line: c.loc.start.line,
        range: c.range,
        rules: [],
      });
    }
    return t;
  }, []);

  for (const p of node.properties) {
    const key = p.key?.name || p.key?.value;
    if (!key) {
      continue;
    }
    const keyLine = p.key.loc.start.line;
    const last = lines.reduce(
      (t, {line}, ci) => ((keyLine >= line) ? ci : t),
      -1
    );
    if (last === -1) {
      context.report({
        messageId: 'beforeAny',
        node: p.key,
        data: {key},
      });
    } else {
      lines[last].rules.push(p);
    }
  }

  for (const comment of lines) {
    let prev = '';
    for (const p of comment.rules) {
      const key = p.key.name || p.key.value;
      if (key.localeCompare(prev) !== 1) {
        context.report({
          messageId: 'outOfOrder',
          node: p.key,
          data: {key},
        });
      }
      prev = key;
    }
  }
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'layout',
    docs: {
      description: 'Ensure eslint rules are sorted',
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      beforeAny: '{{ key }} before any section.  Add a section with a comment like "// [name](link)"',
      outOfOrder: '{{ key }} out of order.',
    },
  },

  create(context) {
    const src = context.sourceCode;

    return {
      [RULES_EXPORT]: node => checkRulesSorted(context, src, node),
      [RULES_KEY]: node => checkRulesSorted(context, src, node),
    };
  },
};
