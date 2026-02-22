# Ensure all rules are valid (`no-unknown-rules`)

"Unknown" rules are usually either typos, or rules that used to exist but have
been deleted.

## Rule Details

This rule aims to detect unknown rules.

Examples of **incorrect** code for this rule:

```js
export default {
  rules: {
    'bad-unknown-bad': 'error',
  },
}
```

Examples of **correct** code for this rule:

```js
export default {
  rules: {
    ...ignored,
    'constructor-super': 'error',
  },
}
```

### Options

None.

## When Not To Use It

There are no known reasons not to use this.
