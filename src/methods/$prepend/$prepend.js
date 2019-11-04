import { $async } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function* $prepend(source, value) {
  yield value;
  yield* source;
}

export default $iterableCurry($prepend);
