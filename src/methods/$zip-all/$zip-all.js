import { $isSync, $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $peekerate } from '../$peekerate/$peekerate';
import { $map } from '../$map/$map';
import { map } from '../$map/map';
import { every } from '../$every/every';
import { $toArray } from '../$to-array/$to-array';

const isDone = peekr => peekr.done;

$async;
export function* $zipAll(sources, { filler } = {}) {
  if (!sources.length) return;

  const peekrs = $await($toArray($map(sources, $peekerate)));
  let done = every(peekrs, isDone);

  try {
    while (!done) {
      yield peekrs.map(({ value, done }) => (done ? filler : value));

      if ($isSync) {
        for (const peekr of peekrs) peekr.advance();
      } else {
        $await(Promise.all(map(peekrs, peekr => peekr.advance())));
      }

      done = every(peekrs, isDone);
    }
  } finally {
    for (const peekr of peekrs) $await(peekr.return());
  }
}

export default $iterableCurry($zipAll, {
  variadic: true,
  minArgs: 0,
  maxArgs: 1,
});
