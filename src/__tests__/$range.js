import { $async } from '../../generate/async.macro';
import { $wrap } from './__framework__/$wrap';

$async;
function* genRange(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

export function $range(start, end, step) {
  return $wrap(genRange(start, end, step));
}
