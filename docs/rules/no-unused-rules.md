# Ensure all non-deprecated rules are used (`no-unused-rules`)

This rule is for completionists that want to ensure they have made an explicit
choice about every possible lint rule.

## Rule Details

Ensure every known (not not deprecated) rule is mentioned, even if it is turned off.

Examples of **incorrect** code for this rule:

```js
export default {
  rules: {}, // Lots of errors, one for each valid rule.
}
```

Examples of **correct** code for this rule:

```js
export default {
  rules: {
    // One mention of every valid rule
  },
}
```

### Options

- `ignore`: array of rules that do not need to be specified

## When Not To Use It

This rule adds a high workload, as it needs to be run once per new version of
eslint or any of the plugins that you use.  It also means that the
"recommended" rule set is no longer useful.
