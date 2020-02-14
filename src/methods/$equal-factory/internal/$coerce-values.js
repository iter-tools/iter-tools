import { $isSync, $isAsync } from '../../../../generate/async.macro';

import { $isIterable } from '../../../internal/$iterable';
import { $wrap } from '../../$wrap/$wrap';

const empty = $wrap([]);

export function coerceValues(values, iterableNullish, syncEqualsAsync) {
  const coercedValues = [];
  let failed = false;
  let anyIterable = false;
  let anySync = false;
  let allIterable = true;
  let allSync = true;

  for (const value of values) {
    const valueIsString = typeof value === 'string';
    const valueIsNullIterable = iterableNullish && value == null;
    // `"abc"` is considered primitive, not equal to `["a", "b", "c"]`.
    // This is because few if any APIs consider those expressions equivalent.
    // Our methods take care to return strings when possible instead of character iterables.
    const valueIsIterable = $isIterable(value) && !valueIsString;
    const valueIsSync = valueIsIterable && !value[Symbol.asyncIterator];

    // prettier-ignore
    coercedValues.push(
      valueIsNullIterable
        ? empty
        : $isSync || valueIsSync
          ? $wrap(value)
          : value,
    );

    const coercedValueIsIterable = valueIsNullIterable || valueIsIterable;

    anyIterable = anyIterable || coercedValueIsIterable;
    allIterable = allIterable && coercedValueIsIterable;
    if ($isAsync) {
      anySync = anySync || valueIsSync;
      allSync = allSync && valueIsSync;
    }
  }

  if ((anyIterable && !allIterable) || ($isAsync && !syncEqualsAsync && anySync && !allSync)) {
    failed = true;
  }

  return [failed, anyIterable, coercedValues];
}
