import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $map } from '../$map/$map';

$async;
export function* $flatMap(source, func) {
  $await;
  for (const item of $map(source, func)) {
    yield* item;
  }
}

export default $iterableCurry($flatMap);
