import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function* $batch(iterable, size) {
  let batch = [];
  $await;
  for (const item of iterable) {
    batch.push(item);
    if (batch.length === size) {
      yield batch;
      batch = [];
    }
  }
  if (batch.length) {
    yield batch;
  }
}

export default $iterableCurry($batch, {
  validateArgs([size]) {
    if (typeof size !== 'number' || size < 1) {
      throw new TypeError('batch size should be a number greater than zero');
    }
  },
});
