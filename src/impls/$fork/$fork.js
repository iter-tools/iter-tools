import { $iteratorSymbol } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $Exchange } from '../../internal/$fork.js';

export function* $__fork(source) {
  const exchange = new $Exchange(source[$iteratorSymbol]());

  // Ensure we don't return the source if more forks can be made
  const dummyFork = exchange.fork();

  try {
    while (true) yield exchange.fork();
  } finally {
    dummyFork.return();
  }
}

export const $fork = /*#__PURE__*/ $iterableCurry($__fork, {
  forceSync: true,
});
