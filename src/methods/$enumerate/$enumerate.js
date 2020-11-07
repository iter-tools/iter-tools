import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function* $enumerate(source, start = 0) {
  let i = start;
  $await;
  for (const value of source) {
    yield [i++, value];
  }
}

export default $iterableCurry($enumerate, {
  minArgs: 0,
  maxArgs: 1,
});
