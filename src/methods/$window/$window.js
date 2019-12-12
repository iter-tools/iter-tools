import { $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';
import { CircularBuffer, ReadOnlyCircularBuffer } from '../../internal/circular-buffer';
import { $concat } from '../$concat/$concat';
import { repeatTimes } from '../repeat-times/repeat-times';

$async;
export function* $window(source, size, { filler } = {}) {
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

export default $iterableCurry($window, {
  minArgs: 1,
  maxArgs: 2,
  optionalArgsAtEnd: true,
  validateArgs(args) {
    if (args[0] && typeof args[0] === 'object') {
      const { filler, size } = args[0];

      if (size !== undefined && args[1] !== undefined) {
        throw new Error(
          'size cannot be specified as both a positional and named argument to window',
        );
      }
      args[0] = size;
      args[1] = { filler };
    }
  },
});
