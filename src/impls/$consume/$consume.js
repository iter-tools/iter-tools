import { $, $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

let warnedCallbackDeprecation = false;

const warnCallbackDeprecation = () => {
  if (!warnedCallbackDeprecation) {
    console.warn(
      `\`${$`consume`}(callback, iterable)\` is deprecated and will be removed in iter-tools@8. ` +
        `Instead use ${$`forEach`}(callback, iterable)`,
    );
    warnedCallbackDeprecation = true;
  }
};

$async;
export function $__consume(iterable, callback = () => {}) {
  let c = 0;
  $await;
  for (const value of iterable) {
    $await(callback(value, c++));
  }
}

export const $consume = /*#__PURE__*/ $iterableCurry($__consume, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
  validateArgs(args) {
    if (typeof args[1] === 'function') {
      warnCallbackDeprecation();
    }
  },
});
