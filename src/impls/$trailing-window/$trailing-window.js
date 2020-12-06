import { $, $async, $await } from '../../../generate/async.macro.cjs';
import { $iterableCurry } from '../../internal/$iterable.js';
import { CircularBuffer, ReadOnlyCircularBuffer } from '../../internal/circular-buffer.js';

$async;
export function* $__trailingWindow(source, size, { filler } = {}) {
  const buffer = new CircularBuffer(size);
  const bufferReadProxy = new ReadOnlyCircularBuffer(buffer);

  buffer.fill(filler);

  $await;
  for (const value of source) {
    buffer.push(value);
    yield bufferReadProxy;
  }
}

export const $trailingWindow = /*#__PURE__*/ $iterableCurry($__trailingWindow, {
  minArgs: 1,
  maxArgs: 2,
  growRight: true,
  validateArgs(args) {
    if (typeof args[1] !== 'number') {
      throw new Error(`${$`trailingWindow`} must be passed a numeric size`);
    }
  },
});
