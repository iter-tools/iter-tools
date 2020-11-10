import { $async } from '../../../generate/async.macro';
import { $wrapWithResultIterable, $ensureIterable } from '../../internal/$iterable';

$async;
export function* $wrap(source) {
  yield* $ensureIterable(source);
}

export default $wrapWithResultIterable($wrap);
