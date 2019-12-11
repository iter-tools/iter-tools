import { $async, $await } from '../../generate/async.macro';

$async;
export function $consumeIterator(iterator) {
  let item;
  while (!(item = $await(iterator.next())).done) {}
  return item;
}
