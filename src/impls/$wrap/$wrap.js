import { $async } from '../../../generate/async.macro.cjs';
import { $wrapWithResultIterable, $ensureIterable } from '../../internal/$iterable.js';

$async;
export function* $wrap(source) {
  yield* $ensureIterable(source);
}

export default $wrapWithResultIterable($wrap);
