import { asyncIterableCurry } from '../../internal/async-iterable';

export async function* __method__(iterable) {
  for await (const item of iterable) {
    yield item;
  }

  throw new Error('Dummy implementation');
}

export default asyncIterableCurry(__method__);
