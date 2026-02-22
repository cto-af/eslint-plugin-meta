# Ensure no deprecated rules are used (`no-deprecated-rules`)

Deprecated rules should not be specified.  Detecting them allows determination
of what the next step should be.

## Rule Details

Examples of **incorrect** code for this rule:

```js
export default {
  rules: {
    'array-bracket-newline': 'off',
  }
}
```

Examples of **correct** code for this rule:

```js
export const rules = {
  'constructor-super': 'error',
}
```

### Options

None.

## When Not To Use It

If you depend on deprecated rules.
