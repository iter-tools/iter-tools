import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $parallelEach } from '../../internal/$parallel-each.js';
import { $peekerate } from '../$peekerate/$peekerate.js';
import { $map } from '../$map/$map.js';
import { every } from '../$every/every.js';
import { $toArray } from '../$to-array/$to-array.js';

const isDone = (peekr) => peekr.done;

$async;
export function* $zipAll(sources, { filler } = {}) {
  const peekrs = $await($toArray($map(sources, $peekerate)));
  let done = every(peekrs, isDone);

  try {
    while (!done) {
      yield peekrs.map(({ value, done }) => (done ? filler : value));

      $await($parallelEach(peekrs, (peekr) => peekr.advance()));

      done = every(peekrs, isDone);
    }
  } finally {
    $await($parallelEach(peekrs, (peekr) => peekr.return()));
  }
}

export default /*#__PURE__*/ $iterableCurry($zipAll, {
  variadic: true,
  minArgs: 0,
  maxArgs: 1,
});
