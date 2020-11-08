import { $async } from '../../generate/async.macro';

$async;
export function* $wrap(source) {
  yield* source;
}
