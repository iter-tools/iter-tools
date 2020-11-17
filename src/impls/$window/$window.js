import { $, $async, $await } from '../../../generate/async.macro.cjs';
import { $iterableCurry } from '../../internal/$iterable.js';
import { CircularBuffer, ReadOnlyCircularBuffer } from '../../internal/circular-buffer.js';

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

export default /*#__PURE__*/ $iterableCurry($window, {
  validateArgs(args) {
    if (typeof args[0] !== 'number') {
      throw new Error(`${$`window`} must be passed a numeric size`);
    }
  },
});
