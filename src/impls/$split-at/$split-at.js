import { $async, $await } from '../../../generate/async.macro.cjs';

import { CircularBuffer } from '../../internal/circular-buffer.js';
import { $iterableCurry } from '../../internal/$iterable.js';
import { $Bisector } from '../../internal/$bisector.js';
import { __wrap } from '../$wrap/wrap.js';
import { $__peekerate } from '../$peekerate/$peekerate.js';

$async;
export function* $indexSplitStrategy(split, { idx }, source) {
  const sourcePeekr = $await($__peekerate(source));

  try {
    const fromEnd = idx < 0;
    const offset = Math.abs(idx);
    const buffer = fromEnd ? new CircularBuffer(offset) : null;
    let currentPos = 0;
    let yielded = 0;
    let value;
    /* eslint-disable-next-line no-unmodified-loop-condition */
    while ((fromEnd || currentPos < idx) && !sourcePeekr.done) {
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
  } finally {
    sourcePeekr.return();
  }
}

export function $__splitAt(source, idx) {
  return new $Bisector(source, $indexSplitStrategy, { idx });
}

export const $splitAt = /*#__PURE__*/ $iterableCurry(
  function $splitAt(source, idx) {
    return __wrap($__splitAt(source, idx));
  },
  {
    forceSync: true,
  },
);
