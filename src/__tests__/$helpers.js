import { $async, $await } from '../../generate/async.macro';

import { $isIterable } from '../internal/$iterable';

$async;
export function $unwrapDeep(iterable) {
  const items = [];

  $await;
  for (const item of iterable) {
    if (typeof item !== 'string' && $isIterable(item)) {
      items.push($await($unwrapDeep(item)));
    } else {
      items.push(item);
    }
  }

  return items;
}
