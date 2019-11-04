import { $async } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function* $append(source, value) {
  yield* source;
  yield value;
}

export default $iterableCurry($append);
