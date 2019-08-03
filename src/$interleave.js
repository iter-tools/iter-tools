import { $async, $await, $iteratorSymbol } from '../generate/async.macro';
import { $ensureIterable, $iterableCurry } from './internal/$iterable';
import $InterleaveBuffer from './internal/interleave/$buffer';
import makeCanTakeAny from './internal/interleave/$can-take-any';

$async;
function* interleave(generatorFn, options, iterables) {
  const buffers = iterables.map(
    (iterable, i) => new $InterleaveBuffer($ensureIterable(iterable)[$iteratorSymbol](), i),
  );

  try {
    const canTakeAny = makeCanTakeAny(buffers);

    yield* options !== undefined
      ? generatorFn(options, canTakeAny, ...buffers)
      : generatorFn(canTakeAny, ...buffers);
  } finally {
    for (const buffer of buffers) {
      if ($await(buffer.canTake()) && typeof buffer._iterator.return === 'function') {
        $await(buffer._iterator.return());
      }
    }
  }
}

export default $iterableCurry(interleave, {
  variadic: true,
  optionalArgsAtEnd: true,
  minArgs: 1,
  maxArgs: 2,
});
