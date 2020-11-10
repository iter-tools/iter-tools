import { $isSync, $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $peekerate } from '../$peekerate/$peekerate';
import { $map } from '../$map/$map';
import { map } from '../$map/map';
import { some } from '../$some/some';
import { $toArray } from '../$to-array/$to-array';

const isDone = peekr => peekr.done;

$async;
export function* $zip(sources) {
  if (!sources.length) return;

  const peekrs = $await($toArray($map(sources, $peekerate)));
  let done = some(peekrs, isDone);

  try {
    while (!done) {
      yield peekrs.map(({ value }) => value);

      if ($isSync) {
        for (const peekr of peekrs) peekr.advance();
      } else {
        $await(Promise.all(map(peekrs, peekr => peekr.advance())));
      }

      done = some(peekrs, isDone);
    }
  } finally {
    for (const peekr of peekrs) $await(peekr.return());
  }
}

export default $iterableCurry($zip, {
  variadic: true,
});
