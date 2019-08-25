import { $isAsync, $async, $iteratorSymbol } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';
import $groupBy from '../$group-by/$group-by';

$async;
function* empty() {}

function* $splitAt(index, iterable) {
  const groupedIter = $groupBy((_item, i) => i >= index, iterable)[$iteratorSymbol]();
  for (let i = 0; i <= 1; i++) {
    const item = groupedIter.next();

    // prettier-ignore
    yield $isAsync
      ? (async function*() {
          const { value, done } = await item;
          yield* done ? empty() : value[1];
        })()
      : item.done
        ? empty()
        : item.value[1];
  }
}

export default $iterableCurry($splitAt, { forceSync: true });
