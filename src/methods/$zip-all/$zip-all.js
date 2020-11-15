import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $parallelEach } from '../../internal/$parallel-each';
import { $peekerate } from '../$peekerate/$peekerate';
import { $map } from '../$map/$map';
import { every } from '../$every/every';
import { $toArray } from '../$to-array/$to-array';

const isDone = peekr => peekr.done;

$async;
export function* $zipAll(sources, { filler } = {}) {
  const peekrs = $await($toArray($map(sources, $peekerate)));
  let done = every(peekrs, isDone);

  try {
    while (!done) {
      yield peekrs.map(({ value, done }) => (done ? filler : value));

      $await($parallelEach(peekrs, peekr => peekr.advance()));

      done = every(peekrs, isDone);
    }
  } finally {
    $await($parallelEach(peekrs, peekr => peekr.return()));
  }
}

export default $iterableCurry($zipAll, {
  variadic: true,
  minArgs: 0,
  maxArgs: 1,
});
