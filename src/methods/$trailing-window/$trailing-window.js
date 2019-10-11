import { $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';
import CircularBuffer from '../../internal/circular-buffer';

$async;
export function* $trailingWindow(source, size, { filler } = {}) {
  const circular = new CircularBuffer(size);

  circular.fill(filler);

  $await;
  for (const item of source) {
    circular.push(item);
    yield circular.readOnlyCopy;
  }
}

export default $iterableCurry($trailingWindow, {
  minArgs: 1,
  maxArgs: 2,
  optionalArgsAtEnd: true,
  validateArgs(args) {
    if (typeof args[0] === 'object' && args[0]) {
      const filler = args[0].filler;
      const size = args[0].size;
      if (size !== undefined && args[1] !== undefined) {
        throw new Error(
          'size cannot be specified as both a positional and named argument to trailingWindow',
        );
      }
      args[0] = size;
      args[1] = { filler };
    }
  },
});
