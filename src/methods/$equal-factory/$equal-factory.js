import { $, $async, $await } from '../../../generate/async.macro';

import { coerceValues } from './internal/$coerce-values';
import { $allEqual } from './internal/$all-equal';
import { $iterableEqual } from './internal/$iterable-equal';

function validateOptions(options = {}) {
  const _options = typeof options === 'function' ? { compare: options } : options;
  const {
    compare = Object.is,
    iterableNullish = true,
    compareValues = true,
    syncEqualsAsync = true,
  } = _options;
  return { compare, iterableNullish, compareValues, syncEqualsAsync };
}

export function $equalFactory(options = {}) {
  const _options = validateOptions(options);
  const { compare, iterableNullish, compareValues, syncEqualsAsync } = _options;

  const $equal = $async((...values) => {
    if (!values.length) {
      throw new Error(`${$`equal`} received no values to compare.`);
    }

    const [failed, comparingIterables, coercedValues] = coerceValues(
      values,
      iterableNullish,
      syncEqualsAsync,
    );

    return (
      !failed &&
      (comparingIterables
        ? $await($iterableEqual(coercedValues, compare))
        : compareValues && $await($allEqual(values, compare)))
    );
  });

  return $equal;
}

// export default options => {
//   return $equalFactory(validateOptions(options));
// };

export default $equalFactory;
