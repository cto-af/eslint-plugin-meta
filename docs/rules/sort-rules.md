# Ensure eslint rules are sorted (`sort-rules`)

When you have a large set of rules (e.g. if you have no-unused-rules enabled),
it's quite nice to have those rules in lexical order to make it easier to find
rules that need to be modified.

## Rule Details

This rule aims to keep all of your rules in order, within a section per plugin.

Examples of **incorrect** code for this rule:

```js
export default {
  rules: {
    // [Possible Problems](https://eslint.org/docs/rules/#possible-problems)
    'constructor-super': 'error',
    'array-callback-return': ['error', {allowImplicit: true}],
  },
}
```

Examples of **correct** code for this rule:

```js
export default {
  rules: {
    // [Possible Problems](https://eslint.org/docs/rules/#possible-problems)
    'array-callback-return': ['error', {allowImplicit: true}],
    'constructor-super': 'error',
  },
}
```

## When Not To Use It

If you like chaos.
