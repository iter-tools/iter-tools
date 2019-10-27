import { $, $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

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
export function $consume(iterable, callback = () => {}) {
  let c = 0;
  $await;
  for (const item of iterable) {
    $await(callback(item, c++));
  }
}

export default $iterableCurry($consume, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
  validateArgs(args) {
    if (typeof args[0] === 'function') {
      warnCallbackDeprecation();
    }
  },
});
