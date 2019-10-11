import { $isAsync, $iteratorSymbol, $async, $await } from '../../generate/async.macro';

$async;
export function $unwrapDeep(iterable) {
  const items = [];

  $await;
  for (const item of iterable) {
    if (
      item != null &&
      typeof item !== 'string' &&
      (typeof item[$iteratorSymbol] === 'function' ||
        ($isAsync && typeof item[Symbol.iterator] === 'function'))
    ) {
      items.push($await($unwrapDeep(item)));
    } else {
      items.push(item);
    }
  }

  return items;
}
