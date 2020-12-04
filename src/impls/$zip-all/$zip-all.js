import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $parallelEach } from '../../internal/$parallel-each.js';
import { $__peekerate } from '../$peekerate/$peekerate.js';
import { $__map } from '../$map/$map.js';
import { __every } from '../$every/every.js';
import { $__toArray } from '../$to-array/$to-array.js';

const isDone = (peekr) => peekr.done;

$async;
export function* $__zipAll(sources, { filler } = {}) {
  const peekrs = $await($__toArray($__map(sources, $__peekerate)));
  let done = __every(peekrs, isDone);

  try {
    while (!done) {
      yield peekrs.map(({ value, done }) => (done ? filler : value));

      $await($parallelEach(peekrs, (peekr) => peekr.advance()));

      done = __every(peekrs, isDone);
    }
  } finally {
    $await($parallelEach(peekrs, (peekr) => peekr.return()));
  }
}

export const $zipAll = /*#__PURE__*/ $iterableCurry($__zipAll, {
  variadic: true,
  minArgs: 0,
  maxArgs: 1,
});
