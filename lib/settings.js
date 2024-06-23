import {builtinRules} from 'eslint/use-at-your-own-risk';

function rename(rules, prefix) {
  if (!rules || typeof rules !== 'object') {
    throw new TypeError(`Invalid rules for prefix "${prefix}": ${rules}`);
  }
  return Object.fromEntries(
    Object.entries(rules).map(([k, v]) => [`${prefix}/${k}`, v])
  );
}

const rulesByLib = Object.create(null, {
  '@': {
    value: Object.fromEntries(builtinRules.entries()),
    writable: false,
    configurable: false,
    enumerable: true,
  },
});

export function getSettings(context) {
  const libs = context?.settings?.meta?.libs ?? {};
  for (const [k, v] of Object.entries(libs)) {
    if (!rulesByLib[k]) {
      rulesByLib[k] = rename(v.rules, k);
    }
  }
  return rulesByLib;
}
