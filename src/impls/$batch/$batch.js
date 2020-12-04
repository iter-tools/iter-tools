import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__spliterate } from '../$spliterate/$spliterate.js';

$async;
function* $batchSpliterator(split, { size }, source) {
  let i = 0;
  $await;
  for (const value of source) {
    if (i === size) {
      yield split;
      i = 0;
    }
    yield value;
    i++;
  }
}

export function $__batch(source, size) {
  return $__spliterate(source, $batchSpliterator, { size });
}

export const $batch = /*#__PURE__*/ $iterableCurry($__batch, {
  validateArgs(args) {
    if (typeof args[1] !== 'number' || args[1] < 1) {
      throw new TypeError('batch size should be a number greater than zero');
    }
  },
});
