import { $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';
import CircularBuffer from '../../internal/circular-buffer';
import { $concat } from '../$concat/$concat';
import { repeat } from '../repeat/repeat';

$async;
export function* $window(iterable, size, { filler } = {}) {
  const circular = new CircularBuffer(size);

  circular.fill(filler);

  let index = 0;
  $await;
  for (const item of $concat(iterable, repeat(filler, size - 1))) {
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
  validateArgs(args) {
    let size;
    let filler;
    if (typeof args[1] === 'number') {
      size = args[1];
    } else if (typeof args[1] === 'object' && args[1]) {
      filler = args[1].filler;
      size = args[1].size;
      if (size !== undefined && args[0] !== undefined) {
        throw new Error(
          'size cannot be specified as both a positional and named argument to window',
        );
      }
    }
    args[0] = size;
    args[1] = { filler };
  },
});
