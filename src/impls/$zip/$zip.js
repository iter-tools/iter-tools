import { $isSync, $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $parallelEach } from '../../internal/$parallel-each.js';
import { $peekerate } from '../$peekerate/$peekerate.js';
import { $map } from '../$map/$map.js';
import { map } from '../$map/map.js';
import { some } from '../$some/some.js';
import { $toArray } from '../$to-array/$to-array.js';

const isDone = (peekr) => peekr.done;

$async;
export function* $zip(sources) {
  const peekrs = $await($toArray($map(sources, $peekerate)));
  let done = some(peekrs, isDone);

  try {
    while (!done) {
      yield peekrs.map(({ value }) => value);

      if ($isSync) {
        for (const peekr of peekrs) peekr.advance();
      } else {
        $await(Promise.all(map(peekrs, (peekr) => peekr.advance())));
      }

      done = some(peekrs, isDone);
    }
  } finally {
    $await($parallelEach(peekrs, (peekr) => peekr.return()));
  }
}

export default /*#__PURE__*/ $iterableCurry($zip, {
  variadic: true,
});
