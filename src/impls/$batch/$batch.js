import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $spliterate } from '../$spliterate/$spliterate.js';

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

export function $batch(source, size) {
  return $spliterate(source, $batchSpliterator, { size });
}

export default /*#__PURE__*/ $iterableCurry($batch, {
  validateArgs([size]) {
    if (typeof size !== 'number' || size < 1) {
      throw new TypeError('batch size should be a number greater than zero');
    }
  },
});
