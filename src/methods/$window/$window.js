import { $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';
import CircularBuffer from '../../internal/circular-buffer';
import { $concat } from '../$concat/$concat';
import { repeat } from '../repeat/repeat';

$async;
export function* $window(source, size, { filler } = {}) {
  const circular = new CircularBuffer(size);

  circular.fill(filler);

  let index = 0;
  $await;
  for (const item of $concat(source, repeat(size - 1, filler))) {
    circular.push(item);
    if (index + 1 >= size) {
      yield circular.readOnlyCopy;
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
