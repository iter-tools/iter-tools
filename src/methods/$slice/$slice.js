import { $async, $await } from '../../../generate/async.macro';

import { CircularBuffer } from '../../internal/circular-buffer';
import { $iterableCurry } from '../../internal/$iterable';
import { isObject } from '../../internal/shapes';

$async;
function bufferedSlice(source, start, end, step) {
  const bufferSize = Math.abs(start);
  const buffer = new CircularBuffer(bufferSize);
  let counter = 0;

  $await;
  for (const item of source) {
    buffer.push(item);
    counter++;
  }

  let newEnd;
  if (isFinite(end) && end > 0) {
    newEnd = end - (counter - buffer.size);
    if (newEnd < 0) return [];
  } else {
    newEnd = end;
  }
  return $simpleSlice(buffer, 0, newEnd, step);
}

$async;
export function* $simpleSlice(source, start, end, step = 1) {
  let currentPos = 0;
  let nextValidPos = start;
  const bufferSize = Math.abs(end);
  let buffer;
  let counter = 0;

  if (end < 0) {
    buffer = new CircularBuffer(bufferSize);
  }

  $await;
  for (let item of source) {
    if (buffer) {
      item = buffer.push(item);
      counter++;
      if (counter <= bufferSize) {
        continue;
      }
    }

    if (currentPos >= end && end >= 0) {
      break;
    }

    if (nextValidPos === currentPos) {
      yield item;
      nextValidPos += step;
    }
    currentPos++;
  }
}

$async;
export function* $slice(source, start, end, step = 1) {
  if (start >= 0) {
    yield* $simpleSlice(source, start, end, step);
  } else {
    yield* $await(bufferedSlice(source, start, end, step));
  }
}

export default $iterableCurry($slice, {
  validateArgs(args) {
    let [optsOrStart = 0, end = Infinity, step = 1] = args;
    let start = typeof optsOrStart === 'number' ? optsOrStart : undefined;
    if (isObject(optsOrStart)) {
      ({ start = 0, end = Infinity, step = 1 } = optsOrStart);
    }

    if (typeof start !== 'number') {
      throw new TypeError('The specified start was not a number');
    }

    if (typeof end !== 'number') {
      throw new TypeError('The specified end was not a number');
    }

    if (typeof step !== 'number' || step <= 0) {
      throw new TypeError('The specified step was not a number > 0');
    }

    args[0] = start;
    args[1] = end;
    args[2] = step;
  },
  optionalArgsAtEnd: true,
  minArgs: 0,
  maxArgs: 3,
});
