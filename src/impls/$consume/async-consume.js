/**
 * @generated-from ./$consume.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncIterableCurry } from '../../internal/async-iterable.js';

let warnedCallbackDeprecation = false;

const warnCallbackDeprecation = () => {
  if (!warnedCallbackDeprecation) {
    console.warn(
      `\`${'asyncConsume'}(callback, iterable)\` is deprecated and will be removed in iter-tools@8. ` +
        `Instead use ${'asyncForEach'}(callback, iterable)`,
    );
    warnedCallbackDeprecation = true;
  }
};

export async function __asyncConsume(iterable, callback = () => {}) {
  let c = 0;
  for await (const value of iterable) {
    await callback(value, c++);
  }
}

export const asyncConsume = /*#__PURE__*/ asyncIterableCurry(__asyncConsume, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
  validateArgs(args) {
    if (typeof args[1] === 'function') {
      warnCallbackDeprecation();
    }
  },
});