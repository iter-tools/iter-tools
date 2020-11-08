import { asyncIterableCurry } from '../../internal/async-iterable';
import { raceTo } from './internal/race-to';

export async function* asyncInterleaveReady(sources) {
  const iterators = sources.map(iterable => iterable[Symbol.asyncIterator]());

  const itemPromises = iterators.map((iter, idx) => iter.next().then(item => ({ idx, item })));

  let ready;
  while ((ready = await raceTo(({ item }) => !item.done, null, itemPromises)) !== null) {
    const { idx, item } = ready;
    yield item.value;
    itemPromises[idx] = iterators[idx].next().then(item => ({ idx, item }));
  }
}

export default asyncIterableCurry(asyncInterleaveReady, {
  variadic: true,
});
