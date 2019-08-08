import { asyncWrapWithMethodIterable } from './internal/async-iterable';

import asyncToArray from './async-to-array';
import cycle from './cycle';

async function* asyncCycle(iterable) {
  yield* cycle(await asyncToArray(iterable));
}

export default asyncWrapWithMethodIterable(asyncCycle);
