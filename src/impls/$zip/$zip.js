import { $isSync, $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $parallelEach } from '../../internal/$parallel-each.js';
import { $__peekerate } from '../$peekerate/$peekerate.js';
import { $__map } from '../$map/$map.js';
import { __map } from '../$map/map.js';
import { __some } from '../$some/some.js';
import { $__toArray } from '../$to-array/$to-array.js';

const isDone = (peekr) => peekr.done;

$async;
export function* $__zip(sources) {
  const peekrs = $await($__toArray($__map(sources, $__peekerate)));
  let done = __some(peekrs, isDone);

  try {
    while (!done) {
      yield peekrs.map(({ value }) => value);

      if ($isSync) {
        for (const peekr of peekrs) peekr.advance();
      } else {
        $await(Promise.all(__map(peekrs, (peekr) => peekr.advance())));
      }

      done = __some(peekrs, isDone);
    }
  } finally {
    $await($parallelEach(peekrs, (peekr) => peekr.return()));
  }
}

export const $zip = /*#__PURE__*/ $iterableCurry($__zip, {
  variadic: true,
});
