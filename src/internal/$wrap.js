import { $async } from '../../generate/async.macro.cjs';

$async;
export function* $wrap(source) {
  yield* source;
}

$async;
export function* $nullableWrap(source) {
  if (source != null) {
    yield* source;
  }
}
