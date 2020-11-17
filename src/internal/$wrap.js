import { $async } from '../../generate/async.macro.cjs';

$async;
export function* $wrap(source) {
  yield* source;
}
