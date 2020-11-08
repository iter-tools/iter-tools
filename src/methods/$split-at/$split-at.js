import { $async, $await } from '../../../generate/async.macro';

import { CircularBuffer } from '../../internal/circular-buffer';
import { $iterableCurry } from '../../internal/$iterable';
import { $Bisector } from '../../internal/$bisector';
import { wrap } from '../../internal/wrap';
import { $peekerate } from '../$peekerate/$peekerate';

$async;
export function* $indexSplitStrategy(split, { idx }, source) {
  const sourcePeekr = $await($peekerate(source));
  const fromEnd = idx < 0;
  const offset = Math.abs(idx);
  const buffer = fromEnd ? new CircularBuffer(offset) : null;
  let currentPos = 0;
  let yielded = 0;
  let sourceDone = false;

  try {
    let value;
    /* eslint-disable no-unmodified-loop-condition */
    while ((fromEnd || currentPos < idx) && !sourcePeekr.done) {
      /* eslint-enable no-unmodified-loop-condition */
      currentPos++;
      ({ value } = sourcePeekr);

      if (fromEnd) {
        value = buffer.push(value);
      }

      if (!fromEnd || currentPos > offset) {
        yield value;
        yielded++;
      }

      $await(sourcePeekr.advance());
    }

    if (fromEnd) {
      let i = yielded;
      while (buffer.size && i++ < offset) {
        yield buffer.shift();
      }
    }

    yield split;

    if (fromEnd) {
      yield* buffer;
    } else {
      while (!sourcePeekr.done) {
        yield sourcePeekr.value;
        $await(sourcePeekr.advance());
      }
    }
    sourceDone = true;
  } finally {
    if (!sourceDone) {
      sourcePeekr.return();
    }
  }
}

export function $splitAt(source, idx) {
  return wrap(new $Bisector(source, $indexSplitStrategy, { idx }));
}

export default $iterableCurry($splitAt, {
  forceSync: true,
});
