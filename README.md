# "@cto.af/eslint-plugin-meta

Ensure eslint all rules are sorted, not deprecated, and included

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `"@cto.af/eslint-plugin-meta`:

```sh
npm install "@cto.af/eslint-plugin-meta --save-dev
```

## Usage

Add `eslint-meta` to the plugins section of your `eslint.config.js` configuration file:

```js
import meta from '@cto.af/eslint-plugin-meta';
export default [
  {
    files: [
      'eslint.config.js'
    ],
    ...meta.configs.recommended,
  },
];
```

## Rules

<!-- Rule Table Start -->
| **Rule Name** | **Description** | **Recommended** |
| :- | :- | :-: |
| [`no-deprecated-rules`](./docs/rules/no-deprecated-rules.md) | Ensure no deprecated rules are used | yes |
| [`no-unknown-rules`](./docs/rules/no-unknown-rules.md) | Ensure all rules are valid | yes |
| [`no-unused-rules`](./docs/rules/no-unused-rules.md) | Ensure all non-deprecated rules are used | yes |
| [`sort-rules`](./docs/rules/sort-rules.md) | Ensure eslint rules are sorted | yes |
<!-- Rule Table End -->
