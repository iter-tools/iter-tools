/**
 * @generated-from ./$collate.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncIterableCurry } from './internal/async-iterable';
import asyncInterleave from './async-interleave';

async function* asyncByPosition({ start, step }, canTakeAny, ...buffers) {
  start = start % buffers.length;

  for (let i = start; await canTakeAny(); i = (i + step) % buffers.length) {
    if (await buffers[i].canTake()) yield await buffers[i].take();
  }
}

async function* asyncByComparison({ comparator }, canTakeAny, ...buffers) {
  let candidateBuffer;

  while ((candidateBuffer = await canTakeAny())) {
    let candidateItem = await candidateBuffer.peek();

    for (const buffer of buffers) {
      const item = await buffer.peek();

      if ((await buffer.canTake()) && comparator(candidateItem, item) < 0) {
        candidateItem = item;
        candidateBuffer = buffer;
      }
    }

    yield await candidateBuffer.take();
  }
}

const defaultOptions = {
  start: 0,
  step: 1,
};

function asyncCollate(start = 0, stepOrComparatorOrOptions = 1, iterables) {
  let by;
  let options;

  if (typeof stepOrComparatorOrOptions === 'function') {
    by = asyncByComparison;
    options = {
      comparator: stepOrComparatorOrOptions,
    };
  } else if (typeof stepOrComparatorOrOptions === 'number' && typeof start === 'number') {
    by = asyncByPosition;
    options = {
      start,
      step: stepOrComparatorOrOptions,
    };
  } else if (stepOrComparatorOrOptions && typeof stepOrComparatorOrOptions === 'object') {
    by = asyncByPosition;
    options = { ...defaultOptions, ...stepOrComparatorOrOptions };
  } else {
    throw new TypeError(
      'collate was passed an invalid value which could not be interpreted as a step, a comparator, or an options object',
    );
  }

  return asyncInterleave(by, options, ...iterables);
}

export default asyncIterableCurry(asyncCollate, {
  variadic: true,
  minArgs: 0,
  maxArgs: 2,
});
