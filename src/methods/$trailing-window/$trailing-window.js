import { $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';
import CircularBuffer from '../../internal/circular-buffer';

$async;
export function* $trailingWindow(iterable, size, { filler } = {}) {
  const circular = new CircularBuffer(size);

  circular.fill(filler);

  $await;
  for (const item of iterable) {
    circular.push(item);
    yield circular.readOnlyCopy;
  }
}

export default $iterableCurry($trailingWindow, {
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
          'size cannot be specified as both a positional and named argument to trailingWindow',
        );
      }
    }
    args[0] = size;
    args[1] = { filler };
  },
});
