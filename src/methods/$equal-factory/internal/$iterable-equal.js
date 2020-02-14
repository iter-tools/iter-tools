import { $async, $await } from '../../../../generate/async.macro';

import { $zipAll } from '../../$zip-all/$zip-all';
import { $iterableIncludesAny } from '../../$includes-any/internal/$iterable-includes-any';
import { $allEqual } from './$all-equal';

const none = {};
const zipAllConfig = { filler: none };

$async;
export function $iterableEqual(iterables, equals) {
  $await;
  for (const values of $zipAll(iterables, zipAllConfig)) {
    if ($await($iterableIncludesAny(values, [none])) || !$await($allEqual(values, equals))) {
      return false;
    }
  }

  return true;
}
