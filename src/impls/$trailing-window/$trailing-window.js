import { $, $async, $await } from '../../../generate/async.macro.cjs';
import { $iterableCurry } from '../../internal/$iterable.js';
import { CircularBuffer, ReadOnlyCircularBuffer } from '../../internal/circular-buffer.js';

import { validateWindowArgs } from './internal/validate-window-args.js';

$async;
export function* $trailingWindow(source, size, { filler } = {}) {
  const buffer = new CircularBuffer(size);
  const bufferReadProxy = new ReadOnlyCircularBuffer(buffer);

  buffer.fill(filler);

  $await;
  for (const value of source) {
    buffer.push(value);
    yield bufferReadProxy;
  }
}

export default /*#__PURE__*/ $iterableCurry($trailingWindow, {
  minArgs: 1,
  maxArgs: 2,
  optionalArgsAtEnd: true,
  validateArgs: /*#__PURE__*/ validateWindowArgs($`trailingWindow`),
});
