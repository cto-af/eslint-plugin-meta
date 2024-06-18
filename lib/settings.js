import {builtinRules} from 'eslint/use-at-your-own-risk';

function rename(rules, prefix) {
  return Object.fromEntries(
    Object.entries(rules).map(([k, v]) => [`${prefix}/${k}`, v])
  );
}

const rulesByLib = {
  '@': Object.fromEntries(builtinRules.entries()),
}

export function getSettings(context) {
  const libs = context?.settings?.meta?.libs ?? {};
  for (const [k, v] of Object.entries(libs)) {
    if (!rulesByLib[k]) {
      rulesByLib[k] = rename(v.rules, k);
    }
  }
  return rulesByLib;
}
