import { $async, $await, $iteratorSymbol } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import CircularBuffer from '../../internal/circular-buffer';
import { $concat } from '../$concat/$concat';
import { repeat } from '../repeat/repeat';

$async;
export function* $cursor(iterable, { size, trailing, filler }) {
  const circular = new CircularBuffer(size);

  circular.fill(filler);

  iterable = iterable[$iteratorSymbol]();

  if (trailing) {
    let index = 0;
    $await;
    for (const item of $concat(iterable, repeat(filler, size - 1))) {
      circular.push(item);
      if (index + 1 >= size) {
        yield circular.readOnlyCopy;
      }
      index++;
    }
  } else {
    $await;
    for (const item of iterable) {
      circular.push(item);
      yield circular.readOnlyCopy;
    }
  }
}

export default $iterableCurry($cursor);
