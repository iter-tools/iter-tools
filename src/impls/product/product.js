import { iterableCurry } from '../../internal/iterable.js';

import { __map } from '../$map/map.js';
import { __toArray } from '../$to-array/to-array.js';

function scanRight(arr, cb, initial) {
  const out = new Array(arr.length);
  let acc = initial;
  for (let i = arr.length - 1; i >= 0; i--) {
    acc = cb(acc, arr[i]);
    out[i] = acc;
  }
  return out;
}

function* permuteIndicies(arrs, size) {
  const lengths = arrs.map((arr) => arr.length);

  // A counter is the number of perutations to yield before changing the index.
  const counterDefaults = scanRight(
    lengths.map((_, i) => i),
    (acc, i) => (acc + 1) * (lengths[i + 1] || 1) - 1,
    0,
  );

  const counters = counterDefaults.slice();
  const indicies = lengths.map((_) => 0);

  for (let n = 0; n < size; n++) {
    yield indicies;
    for (let i = 0; i < lengths.length; i++) {
      indicies[i] = (indicies[i] + (counters[i] === 0 ? 1 : 0)) % lengths[i];
      counters[i] = counters[i] === 0 ? counterDefaults[i] : counters[i] - 1;
    }
  }
}

export function __product(iterables) {
  const arrs = __toArray(__map(iterables, __toArray));
  const size = arrs.reduce((size, arr) => size * arr.length, Math.min(arrs.length, 1));

  return {
    *[Symbol.iterator]() {
      if (arrs.length === 0) return [];

      for (const indicies of permuteIndicies(arrs, size)) {
        yield indicies.map((valueIndex, i) => arrs[i][valueIndex]);
      }
    },
    size,
  };
}

export const product = /*#__PURE__*/ iterableCurry(__product, {
  variadic: true,
  reduces: true,
});
