import { $, $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';
import { CircularBuffer, ReadOnlyCircularBuffer } from '../../internal/circular-buffer';

$async;
export function* $window(source, size) {
  const buffer = new CircularBuffer(size);
  const bufferReadProxy = new ReadOnlyCircularBuffer(buffer);

  $await;
  for (const item of source) {
    buffer.push(item);
    if (buffer.isFull()) {
      yield bufferReadProxy;
    }
  }
}

export default $iterableCurry($window, {
  validateArgs(args) {
    if (typeof args[0] !== 'number') {
      throw new Error(`${$`window`} must be passed a numeric size`);
    }
  },
});
