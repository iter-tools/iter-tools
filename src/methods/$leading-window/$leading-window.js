import { $, $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';
import { CircularBuffer, ReadOnlyCircularBuffer } from '../../internal/circular-buffer';
import { $concat } from '../$concat/$concat';
import { repeatTimes } from '../repeat-times/repeat-times';

import { validateWindowArgs } from '../$trailing-window/internal/validate-window-args';

$async;
export function* $leadingWindow(source, size, { filler } = {}) {
  const buffer = new CircularBuffer(size);
  const bufferReadProxy = new ReadOnlyCircularBuffer(buffer);

  buffer.fill(filler);

  let index = 0;
  $await;
  for (const item of $concat(source, repeatTimes(size - 1, filler))) {
    buffer.push(item);
    if (index + 1 >= size) {
      yield bufferReadProxy;
    }
    index++;
  }
}

export default $iterableCurry($leadingWindow, {
  minArgs: 1,
  maxArgs: 2,
  optionalArgsAtEnd: true,
  validateArgs: validateWindowArgs($`leadingWindow`),
});
