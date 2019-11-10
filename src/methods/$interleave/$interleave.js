import { $async, $await, $iteratorSymbol } from '../../../generate/async.macro';
import { $ensureIterable, $iterableCurry } from '../../internal/$iterable';
import $InterleaveBuffer from './internal/$buffer';
import $makeCanTakeAny from './internal/$can-take-any';

$async;
export function* $interleave(sources, generateInterleaved, options) {
  const buffers = sources.map(
    (iterable, i) => new $InterleaveBuffer($ensureIterable(iterable)[$iteratorSymbol](), i),
  );

  try {
    const canTakeAny = $makeCanTakeAny(buffers);

    yield* options !== undefined
      ? generateInterleaved(options, canTakeAny, ...buffers)
      : generateInterleaved(canTakeAny, ...buffers);
  } finally {
    for (const buffer of buffers) {
      if ($await(buffer.canTake()) && typeof buffer._iterator.return === 'function') {
        $await(buffer._iterator.return());
      }
    }
  }
}

export default $iterableCurry($interleave, {
  variadic: true,
  optionalArgsAtEnd: true,
  minArgs: 1,
  maxArgs: 2,
});
