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

## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->
