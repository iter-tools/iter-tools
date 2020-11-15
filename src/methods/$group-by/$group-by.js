import { $, $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $spliterateGrouped } from '../$spliterate-grouped/$spliterate-grouped';
import { $peekerate } from '../$peekerate/$peekerate';

const initialKey = Symbol('initial group key');

let warnedNullGetKeyDeprecation = false;

const warnNullGetKeyDeprecation = () => {
  if (!warnedNullGetKeyDeprecation) {
    console.warn(
      `\`${$`groupBy`}(null, iterable)\` is deprecated and will be removed in iter-tools@8. ` +
        `Instead use ${$`group`}(iterable)`,
    );
    warnedNullGetKeyDeprecation = true;
  }
};

$async;
function* $groupingSpliterator(split, { getKey }, source) {
  const peekr = $await($peekerate(source));
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

export function $groupBy(source, getKey) {
  if (getKey === null) {
    warnNullGetKeyDeprecation();
    getKey = _ => _;
  }

  return $spliterateGrouped(source, $groupingSpliterator, { getKey });
}

export default $iterableCurry($groupBy);
