import { $, $async, $await } from '../../../generate/async.macro.cjs';
import { $iterableCurry } from '../../internal/$iterable.js';
import { CircularBuffer, ReadOnlyCircularBuffer } from '../../internal/circular-buffer.js';

$async;
export function* $__windowBehind(source, size, { filler } = {}) {
  const buffer = new CircularBuffer(size);
  const bufferReadProxy = new ReadOnlyCircularBuffer(buffer);

  buffer.fill(filler);

  $await;
  for (const value of source) {
    buffer.push(value);
    yield bufferReadProxy;
  }
}

export const $windowBehind = /*#__PURE__*/ $iterableCurry($__windowBehind, {
  minArgs: 1,
  maxArgs: 2,
  validateArgs(args) {
    if (typeof args[1] !== 'number') {
      throw new Error(`${$`windowBehind`} must be passed a numeric size`);
    }
  },
});
