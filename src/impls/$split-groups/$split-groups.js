import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__spliterateGrouped } from '../$spliterate-grouped/$spliterate-grouped.js';
import { $__peekerate } from '../$peekerate/$peekerate.js';

const initialKey = Symbol('initial group key');

$async;
function* $groupingSpliterator(split, { getKey }, source) {
  const peekr = $await($__peekerate(source));
  let key = initialKey;
  let idx = 0;

  while (!peekr.done) {
    const lastKey = key;

    key = $await(getKey(peekr.value, idx++));

    if (lastKey !== key) {
      yield split;
      yield key;
    }

    yield peekr.value;

    $await(peekr.advance());
  }
}

export function $__splitGroups(source, getKey = (value) => value) {
  return $__spliterateGrouped(source, $groupingSpliterator, { getKey });
}

export const $splitGroups = /*#__PURE__*/ $iterableCurry($__splitGroups, {
  minArgs: 0,
  maxArgs: 1,
});
