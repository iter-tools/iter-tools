import { $, $async, $await } from '../../../generate/async.macro';

import { coerceValues } from '../$equal-factory/internal/$coerce-values';
import { $iterableEqual } from '../$equal-factory/internal/$iterable-equal';
import { $allEqual } from '../$equal-factory/internal/$all-equal';
import { objectEntries } from '../object-entries/object-entries';

const isObject = o => o != null && typeof o === 'object';

const defaultCompareFactory = options => {
  const $deepEqual = $deepEqualFactory(options);
  return $async((a, b) => {
    return isObject(a) && isObject(b)
      ? $await($deepEqual(objectEntries(a), objectEntries(b)))
      : Object.is(a, b);
  });
};

function validateOptions(options) {
  const _options = typeof options === 'function' ? { compareFactory: options } : options;
  const {
    compare,
    compareFactory = compare ? undefined : defaultCompareFactory,
    compareValues = true,
    iterableNullish = true,
    syncEqualsAsync = true,
  } = _options;
  if (compare && compareFactory) {
    throw new Error('deepEqualFactory cannot have both compare and compareFactory arguments');
  }
  return { compare, compareFactory, iterableNullish, compareValues, syncEqualsAsync };
}

export function $deepEqualFactory(options = {}) {
  const _options = validateOptions(options);
  const { compareFactory, iterableNullish, syncEqualsAsync } = _options;
  let { compare, compareValues } = _options;

  const $deepEqual = $async((...values) => {
    if (!values.length) {
      throw new Error(`${$`deepEqual`} received no values to compare.`);
    }

    // Set compareValues to false to nudge the user away from creating an infinite loop like:
    // compare => deepEqual => allEqual => compare => deepEqual => ...
    compare =
      compare || compareFactory(compareValues ? _options : { ..._options, compareValues: false });

    const [failed, comparingIterables, coercedValues] = coerceValues(
      values,
      iterableNullish,
      syncEqualsAsync,
    );

    if (!compareValues) {
      compareValues = true; // essential for recursion
      if (failed || !comparingIterables) {
        throw new Error(`A value passed to ${$`deepEqual`} was not iterable`);
      }
    }

    return (
      !failed &&
      (comparingIterables
        ? $await($iterableEqual(coercedValues, $deepEqual))
        : $await($allEqual(values, compare)))
    );
  });

  return $deepEqual;
}

export default $deepEqualFactory;
