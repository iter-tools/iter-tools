import { $async, $iteratorSymbol } from '../generate/async.macro';
import { $wrapWithMethodIterable, $ensureIterable } from './internal/$iterable';

$async;
function* $identity(iterable) {
  yield* $ensureIterable(iterable)[$iteratorSymbol]();
}

export default $wrapWithMethodIterable($identity);
