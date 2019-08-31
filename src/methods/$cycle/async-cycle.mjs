import { asyncWrapWithMethodIterable } from '../../internal/async-iterable';

import { asyncToArray } from '../$to-array/async-to-array';
import { cycle } from './cycle';

export async function* asyncCycle(iterable) {
  yield* cycle(await asyncToArray(iterable));
}

export default asyncWrapWithMethodIterable(asyncCycle);
